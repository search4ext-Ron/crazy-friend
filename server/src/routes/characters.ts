import express from 'express';
import { db } from '../database/init';

const router = express.Router();

// Get all active characters
router.get('/', (req, res) => {
  try {
    const characters = db.prepare(`
      SELECT * FROM characters
      WHERE is_active = 1
      ORDER BY persona_type, gender, name
    `).all() as any[];

    // Parse comedy_styles JSON
    const parsed = characters.map(char => ({
      ...char,
      comedy_styles: JSON.parse(char.comedy_styles || '[]'),
    }));

    res.json({ characters: parsed });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get character by ID
router.get('/:id', (req, res) => {
  try {
    const character = db.prepare('SELECT * FROM characters WHERE id = ? AND is_active = 1')
      .get(req.params.id) as any;

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    character.comedy_styles = JSON.parse(character.comedy_styles || '[]');
    res.json({ character });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

