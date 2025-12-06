import express from 'express';
import { llmService } from '../services/llm';
import { db } from '../database/init';
import { detectSelfHarm, getCrisisResponse } from '../utils/safety';
import { sanitizeInput } from '../middleware/validation';
import { env } from '../utils/env';

const router = express.Router();

// Free question endpoint (no authentication required)
router.post('/', async (req, res) => {
  try {
    const { characterId, question } = req.body;

    if (!characterId || !question) {
      return res.status(400).json({ error: 'Character ID and question required' });
    }

    // Safety check
    if (detectSelfHarm(question)) {
      return res.json({
        response: getCrisisResponse(),
        sessionEnded: true,
        crisisHotline: env.CRISIS_HOTLINE,
      });
    }

    // Get character details
    const character = db.prepare('SELECT * FROM characters WHERE id = ? AND is_active = 1')
      .get(characterId) as any;
    
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // Sanitize input
    const sanitizedQuestion = sanitizeInput(question);

    // Generate AI response (using a temporary user ID of 0 for free questions)
    const response = await llmService.generateResponse(
      sanitizedQuestion,
      characterId,
      0, // Temporary user ID for free questions
      0  // Temporary session ID
    );

    res.json({
      response,
      character: {
        name: character.name,
        persona_type: character.persona_type,
      },
    });
  } catch (error: any) {
    console.error('Free question error:', error);
    res.status(500).json({ error: 'Failed to generate response. Please try again.' });
  }
});

export default router;

