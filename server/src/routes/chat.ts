import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { llmService } from '../services/llm';
import { db } from '../database/init';
import { detectSelfHarm } from '../utils/safety';
import { validate, messageSchema, sessionSchema, sanitizeInput } from '../middleware/validation';
import { logger } from '../utils/logger';

const router = express.Router();

// Create chat session
router.post('/session', authenticateToken, validate(sessionSchema), async (req: AuthRequest, res) => {
  try {
    const { characterId, comedyStyles } = req.body;

    if (!characterId) {
      return res.status(400).json({ error: 'Character ID required' });
    }

    // Check character exists
    const character = db.prepare('SELECT * FROM characters WHERE id = ? AND is_active = 1')
      .get(characterId) as any;
    
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // Use provided styles or character defaults
    const styles = comedyStyles || JSON.parse(character.comedy_styles);

    const result = db.prepare(`
      INSERT INTO chat_sessions (user_id, character_id, comedy_styles)
      VALUES (?, ?, ?)
    `).run(req.userId, characterId, JSON.stringify(styles));

    res.json({
      sessionId: result.lastInsertRowid,
      character,
      comedyStyles: styles,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Send message
router.post('/message', authenticateToken, validate(messageSchema), async (req: AuthRequest, res) => {
  try {
    const { sessionId, message: rawMessage, isVoice } = req.body;
    const message = sanitizeInput(rawMessage);

    if (!sessionId || !message) {
      return res.status(400).json({ error: 'Session ID and message required' });
    }

    // Check session belongs to user
    const session = db.prepare(`
      SELECT * FROM chat_sessions WHERE id = ? AND user_id = ?
    `).get(sessionId, req.userId) as any;

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check subscription limits for free users
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId) as any;
    if (user.subscription_tier === 'free') {
      const today = new Date().toISOString().split('T')[0];
      const todayMessages = db.prepare(`
        SELECT COUNT(*) as count FROM messages m
        JOIN chat_sessions cs ON m.session_id = cs.id
        WHERE cs.user_id = ? AND DATE(m.created_at) = ?
      `).get(req.userId, today) as any;

      if (todayMessages.count >= 10) {
        return res.status(403).json({ 
          error: 'Daily message limit reached. Upgrade to premium for unlimited chats.',
          limitReached: true,
        });
      }
    }

    // Safety check - if self-harm detected, end session
    if (detectSelfHarm(message)) {
      // Save user message
      db.prepare(`
        INSERT INTO messages (session_id, role, content, is_voice)
        VALUES (?, ?, ?, ?)
      `).run(sessionId, 'user', message, isVoice ? 1 : 0);

      const crisisResponse = await llmService.generateResponse(
        message,
        session.character_id,
        req.userId || 0,
        sessionId
      );

      // Save crisis response
      db.prepare(`
        INSERT INTO messages (session_id, role, content)
        VALUES (?, ?, ?)
      `).run(sessionId, 'assistant', crisisResponse);

      // End session
      db.prepare('UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(sessionId);

      const { env } = require('../utils/env');
      return res.json({
        response: crisisResponse,
        sessionEnded: true,
        crisisHotline: env.CRISIS_HOTLINE,
      });
    }

    // Save user message
    db.prepare(`
      INSERT INTO messages (session_id, role, content, is_voice)
      VALUES (?, ?, ?, ?)
    `).run(sessionId, 'user', message, isVoice ? 1 : 0);

    // Generate AI response
    const response = await llmService.generateResponse(
      message,
      session.character_id,
      req.userId || 0,
      sessionId
    );

    // Save AI response
    const messageResult = db.prepare(`
      INSERT INTO messages (session_id, role, content)
      VALUES (?, ?, ?)
    `).run(sessionId, 'assistant', response);

    // Update session
    db.prepare('UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(sessionId);

    res.json({
      response,
      messageId: messageResult.lastInsertRowid,
      sessionEnded: false,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get session history
router.get('/session/:sessionId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { sessionId } = req.params;

    const session = db.prepare(`
      SELECT cs.*, c.name as character_name, c.persona_type, c.gender
      FROM chat_sessions cs
      JOIN characters c ON cs.character_id = c.id
      WHERE cs.id = ? AND cs.user_id = ?
    `).get(sessionId, req.userId) as any;

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const messages = db.prepare(`
      SELECT * FROM messages
      WHERE session_id = ?
      ORDER BY created_at ASC
    `).all(sessionId) as any[];

    res.json({
      session,
      messages,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's sessions
router.get('/sessions', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const sessions = db.prepare(`
      SELECT cs.*, c.name as character_name, c.persona_type, c.gender,
             (SELECT COUNT(*) FROM messages WHERE session_id = cs.id) as message_count
      FROM chat_sessions cs
      JOIN characters c ON cs.character_id = c.id
      WHERE cs.user_id = ?
      ORDER BY cs.updated_at DESC
      LIMIT 50
    `).all(req.userId) as any[];

    res.json({ sessions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Submit feedback
router.post('/feedback', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { messageId, sessionId, feedbackType } = req.body;

    if (!messageId || !feedbackType) {
      return res.status(400).json({ error: 'Message ID and feedback type required' });
    }

    db.prepare(`
      INSERT INTO user_feedback (user_id, session_id, message_id, feedback_type)
      VALUES (?, ?, ?, ?)
    `).run(req.userId, sessionId, messageId, feedbackType);

    // Update message feedback score
    if (feedbackType === 'funny') {
      db.prepare('UPDATE messages SET feedback_score = COALESCE(feedback_score, 0) + 1 WHERE id = ?')
        .run(messageId);
    }

    res.json({ message: 'Feedback recorded' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

