import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { db } from '../database/init';
import { llmService } from '../services/llm';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const profile = db.prepare('SELECT * FROM user_profiles WHERE user_id = ?')
      .get(req.userId) as any;

    const user = db.prepare('SELECT id, email, subscription_tier, subscription_expires_at FROM users WHERE id = ?')
      .get(req.userId) as any;

    res.json({
      user,
      profile: profile || null,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create/update user profile
router.post('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { age, sex, ethnicity, sexual_orientation, location, preferred_comedy_styles } = req.body;

    const existing = db.prepare('SELECT id FROM user_profiles WHERE user_id = ?')
      .get(req.userId) as any;

    const profileData = {
      age: age || null,
      sex: sex || null,
      ethnicity: ethnicity || null,
      sexual_orientation: sexual_orientation || null,
      location: location || null,
      preferred_comedy_styles: preferred_comedy_styles 
        ? JSON.stringify(preferred_comedy_styles)
        : null,
    };

    if (existing) {
      db.prepare(`
        UPDATE user_profiles
        SET age = ?, sex = ?, ethnicity = ?, sexual_orientation = ?, 
            location = ?, preferred_comedy_styles = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `).run(
        profileData.age,
        profileData.sex,
        profileData.ethnicity,
        profileData.sexual_orientation,
        profileData.location,
        profileData.preferred_comedy_styles,
        req.userId
      );
    } else {
      db.prepare(`
        INSERT INTO user_profiles 
        (user_id, age, sex, ethnicity, sexual_orientation, location, preferred_comedy_styles)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        req.userId,
        profileData.age,
        profileData.sex,
        profileData.ethnicity,
        profileData.sexual_orientation,
        profileData.location,
        profileData.preferred_comedy_styles
      );
    }

    // Get suggested comedy styles if not provided
    let suggestedStyles = preferred_comedy_styles;
    if (!suggestedStyles && (age || location)) {
      const profile = { age, location };
      suggestedStyles = await llmService.suggestComedyStyles(profile);
    }

    res.json({
      message: 'Profile updated',
      suggestedComedyStyles: suggestedStyles,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get subscription status
router.get('/subscription', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = db.prepare('SELECT subscription_tier, subscription_expires_at FROM users WHERE id = ?')
      .get(req.userId) as any;

    const isActive = user.subscription_tier === 'premium' && 
      (!user.subscription_expires_at || new Date(user.subscription_expires_at) > new Date());

    res.json({
      tier: isActive ? 'premium' : 'free',
      expiresAt: user.subscription_expires_at,
      isActive,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update subscription (for payment processing - placeholder)
router.post('/subscription', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { tier, expiresAt } = req.body;

    // In production, verify payment with payment processor first
    db.prepare(`
      UPDATE users 
      SET subscription_tier = ?, subscription_expires_at = ?
      WHERE id = ?
    `).run(tier, expiresAt, req.userId);

    res.json({ message: 'Subscription updated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

