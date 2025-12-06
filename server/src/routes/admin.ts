import express from 'express';
import { authenticateToken, AuthRequest, requireAdmin } from '../middleware/auth';
import { db } from '../database/init';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Get analytics dashboard data
router.get('/analytics', (req: AuthRequest, res) => {
  try {
    // User statistics
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get() as any;
    const premiumUsers = db.prepare('SELECT COUNT(*) as count FROM users WHERE subscription_tier = ?')
      .get('premium') as any;
    const activeUsers = db.prepare(`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM chat_sessions 
      WHERE created_at > datetime('now', '-7 days')
    `).get() as any;

    // Character popularity
    const characterStats = db.prepare(`
      SELECT c.id, c.name, c.persona_type, c.gender,
             COUNT(cs.id) as session_count,
             COUNT(m.id) as message_count
      FROM characters c
      LEFT JOIN chat_sessions cs ON c.id = cs.character_id
      LEFT JOIN messages m ON cs.id = m.session_id
      GROUP BY c.id
      ORDER BY session_count DESC
    `).all() as any[];

    // Comedy style popularity
    const styleStats = db.prepare(`
      SELECT 
        json_each.value as style,
        COUNT(*) as usage_count
      FROM chat_sessions cs,
      json_each(cs.comedy_styles)
      GROUP BY json_each.value
      ORDER BY usage_count DESC
    `).all() as any[];

    // Demographics
    const demographics = db.prepare(`
      SELECT 
        sex,
        COUNT(*) as count
      FROM user_profiles
      WHERE sex IS NOT NULL
      GROUP BY sex
    `).all() as any[];

    // Feedback statistics
    const feedbackStats = db.prepare(`
      SELECT 
        feedback_type,
        COUNT(*) as count
      FROM user_feedback
      GROUP BY feedback_type
    `).all() as any[];

    // Safety alerts
    const safetyAlerts = db.prepare(`
      SELECT COUNT(*) as count
      FROM admin_logs
      WHERE action = 'SAFETY_ALERT'
      AND created_at > datetime('now', '-30 days')
    `).get() as any;

    res.json({
      users: {
        total: totalUsers.count,
        premium: premiumUsers.count,
        activeLast7Days: activeUsers.count,
      },
      characters: characterStats,
      comedyStyles: styleStats,
      demographics,
      feedback: feedbackStats,
      safety: {
        alertsLast30Days: safetyAlerts.count,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all characters (including inactive)
router.get('/characters', (req: AuthRequest, res) => {
  try {
    const characters = db.prepare(`
      SELECT * FROM characters
      ORDER BY persona_type, gender, name
    `).all() as any[];

    const parsed = characters.map(char => ({
      ...char,
      comedy_styles: JSON.parse(char.comedy_styles || '[]'),
    }));

    res.json({ characters: parsed });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create character
router.post('/characters', (req: AuthRequest, res) => {
  try {
    const {
      name,
      gender,
      persona_type,
      voice_description,
      accent_description,
      vernacular,
      worldview,
      comedy_styles,
    } = req.body;

    if (!name || !gender || !persona_type) {
      return res.status(400).json({ error: 'Name, gender, and persona_type required' });
    }

    const result = db.prepare(`
      INSERT INTO characters 
      (name, gender, persona_type, voice_description, accent_description, vernacular, worldview, comedy_styles)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name,
      gender,
      persona_type,
      voice_description || '',
      accent_description || '',
      vernacular || '',
      worldview || '',
      JSON.stringify(comedy_styles || [])
    );

    // Log action
    db.prepare(`
      INSERT INTO admin_logs (admin_user_id, action, details)
      VALUES (?, ?, ?)
    `).run(
      req.userId,
      'CREATE_CHARACTER',
      JSON.stringify({ characterId: result.lastInsertRowid, name })
    );

    res.status(201).json({
      message: 'Character created',
      characterId: result.lastInsertRowid,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update character
router.put('/characters/:id', (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      gender,
      persona_type,
      voice_description,
      accent_description,
      vernacular,
      worldview,
      comedy_styles,
      is_active,
    } = req.body;

    db.prepare(`
      UPDATE characters
      SET name = ?, gender = ?, persona_type = ?, voice_description = ?,
          accent_description = ?, vernacular = ?, worldview = ?, 
          comedy_styles = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name,
      gender,
      persona_type,
      voice_description,
      accent_description,
      vernacular,
      worldview,
      JSON.stringify(comedy_styles || []),
      is_active !== undefined ? is_active : 1,
      id
    );

    // Log action
    db.prepare(`
      INSERT INTO admin_logs (admin_user_id, action, details)
      VALUES (?, ?, ?)
    `).run(
      req.userId,
      'UPDATE_CHARACTER',
      JSON.stringify({ characterId: id })
    );

    res.json({ message: 'Character updated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete character (soft delete)
router.delete('/characters/:id', (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    db.prepare('UPDATE characters SET is_active = 0 WHERE id = ?').run(id);

    // Log action
    db.prepare(`
      INSERT INTO admin_logs (admin_user_id, action, details)
      VALUES (?, ?, ?)
    `).run(
      req.userId,
      'DELETE_CHARACTER',
      JSON.stringify({ characterId: id })
    );

    res.json({ message: 'Character deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Search interactions
router.get('/search', (req: AuthRequest, res) => {
  try {
    const { query, type } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query required' });
    }

    let results: any[] = [];

    if (type === 'messages' || !type) {
      const messages = db.prepare(`
        SELECT m.*, cs.user_id, c.name as character_name
        FROM messages m
        JOIN chat_sessions cs ON m.session_id = cs.id
        JOIN characters c ON cs.character_id = c.id
        WHERE m.content LIKE ?
        ORDER BY m.created_at DESC
        LIMIT 100
      `).all(`%${query}%`) as any[];

      results = messages;
    }

    if (type === 'users' || !type) {
      const users = db.prepare(`
        SELECT id, email, subscription_tier, created_at
        FROM users
        WHERE email LIKE ?
        LIMIT 50
      `).all(`%${query}%`) as any[];

      results = [...results, ...users];
    }

    res.json({ results });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get admin logs
router.get('/logs', (req: AuthRequest, res) => {
  try {
    const { limit = 100 } = req.query;

    const logs = db.prepare(`
      SELECT al.*, u.email as admin_email
      FROM admin_logs al
      JOIN users u ON al.admin_user_id = u.id
      ORDER BY al.created_at DESC
      LIMIT ?
    `).all(limit) as any[];

    res.json({ logs });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

