import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../database/init';
import { env } from '../utils/env';
import { logger } from '../utils/logger';

export interface AuthRequest extends Request {
  userId?: number;
  user?: any;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: number };
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId) as any;
    
    if (!user) {
      logger.warn('Token valid but user not found', { userId: decoded.userId });
      return res.status(401).json({ error: 'User not found' });
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    logger.warn('Invalid token attempt', { ip: (req as any).ip || 'unknown' });
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Check if user is admin
  if (!env.ADMIN_EMAILS.includes(req.user.email)) {
    logger.warn('Admin access denied', { userId: req.userId, email: req.user.email, ip: req.ip });
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
}

