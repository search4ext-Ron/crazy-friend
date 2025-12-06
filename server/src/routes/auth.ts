import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { db } from '../database/init';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { validate, registerSchema, loginSchema } from '../middleware/validation';
import { logger } from '../utils/logger';
import { env } from '../utils/env';

const router = express.Router();

// Register
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const result = db.prepare(`
      INSERT INTO users (email, password_hash)
      VALUES (?, ?)
    `).run(email, passwordHash);

    const token = jwt.sign(
      { userId: result.lastInsertRowid },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    logger.info('User registered', { userId: result.lastInsertRowid, email });

    res.status(201).json({
      message: 'User created successfully',
      token,
      userId: result.lastInsertRowid,
      disclaimerAccepted: false,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password, twoFactorCode } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check 2FA if enabled
    if (user.two_factor_enabled) {
      if (!twoFactorCode) {
        return res.status(400).json({ error: '2FA code required', requires2FA: true });
      }

      const verified = speakeasy.totp.verify({
        secret: user.two_factor_secret,
        encoding: 'base32',
        token: twoFactorCode,
        window: 2,
      });

      if (!verified) {
        return res.status(401).json({ error: 'Invalid 2FA code' });
      }
    }

    const token = jwt.sign(
      { userId: user.id },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as string | number }
    );

    logger.info('User logged in', { userId: user.id, email });

    res.json({
      token,
      userId: user.id,
      twoFactorEnabled: user.two_factor_enabled === 1,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Setup 2FA
router.post('/2fa/setup', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId) as any;
    
    const secret = speakeasy.generateSecret({
      name: `${env.TOTP_ISSUER} (${user.email})`,
      issuer: env.TOTP_ISSUER,
    });

    // Store secret temporarily (user needs to verify before enabling)
    db.prepare('UPDATE users SET two_factor_secret = ? WHERE id = ?').run(
      secret.base32,
      req.userId
    );

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url || '');

    res.json({
      secret: secret.base32,
      qrCode: qrCodeUrl,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Verify and enable 2FA
router.post('/2fa/verify', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { code } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId) as any;

    if (!user.two_factor_secret) {
      return res.status(400).json({ error: '2FA not set up. Call /2fa/setup first' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.two_factor_secret,
      encoding: 'base32',
      token: code,
      window: 2,
    });

    if (!verified) {
      return res.status(400).json({ error: 'Invalid code' });
    }

    db.prepare('UPDATE users SET two_factor_enabled = 1 WHERE id = ?').run(req.userId);

    res.json({ message: '2FA enabled successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Disable 2FA
router.post('/2fa/disable', authenticateToken, async (req: AuthRequest, res) => {
  try {
    db.prepare('UPDATE users SET two_factor_enabled = 0, two_factor_secret = NULL WHERE id = ?')
      .run(req.userId);

    res.json({ message: '2FA disabled successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Accept disclaimer
router.post('/disclaimer/accept', authenticateToken, async (req: AuthRequest, res) => {
  try {
    // Store acceptance in user profile or a separate table
    // For now, we'll just return success
    res.json({ message: 'Disclaimer accepted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

