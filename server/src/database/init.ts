import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../../data/crazyfriend.db');
const dbDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

export function initializeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      two_factor_secret TEXT,
      two_factor_enabled INTEGER DEFAULT 0,
      subscription_tier TEXT DEFAULT 'free',
      subscription_expires_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // User profiles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      age INTEGER,
      sex TEXT,
      ethnicity TEXT,
      sexual_orientation TEXT,
      location TEXT,
      preferred_comedy_styles TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Characters table
  db.exec(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      gender TEXT NOT NULL,
      persona_type TEXT NOT NULL,
      voice_description TEXT,
      accent_description TEXT,
      vernacular TEXT,
      worldview TEXT,
      comedy_styles TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Chat sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS chat_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      character_id INTEGER,
      comedy_styles TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (character_id) REFERENCES characters(id)
    )
  `);

  // Messages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      is_voice INTEGER DEFAULT 0,
      feedback_score INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
    )
  `);

  // User feedback table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      session_id INTEGER,
      message_id INTEGER,
      feedback_type TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (session_id) REFERENCES chat_sessions(id),
      FOREIGN KEY (message_id) REFERENCES messages(id)
    )
  `);

  // Admin logs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admin_user_id INTEGER NOT NULL,
      action TEXT NOT NULL,
      details TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_user_id) REFERENCES users(id)
    )
  `);

  // Initialize default characters
  initializeDefaultCharacters();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function initializeDefaultCharacters() {
  const defaultCharacters = [
    {
      name: 'Brooklyn',
      gender: 'male',
      persona_type: 'new_yorker',
      voice_description: 'Fast-talking, nasal Brooklyn accent',
      accent_description: 'Brooklyn, New York',
      vernacular: 'Yo, fuggedaboutit, cawfee, dawg',
      worldview: 'Street-smart, no-nonsense, direct',
      comedy_styles: JSON.stringify(['observational', 'anecdotal', 'satirical']),
    },
    {
      name: 'Brooklyn',
      gender: 'female',
      persona_type: 'new_yorker',
      voice_description: 'Fast-talking, sassy Brooklyn accent',
      accent_description: 'Brooklyn, New York',
      vernacular: 'Yo, fuggedaboutit, cawfee, babe',
      worldview: 'Street-smart, no-nonsense, direct',
      comedy_styles: JSON.stringify(['observational', 'anecdotal', 'satirical']),
    },
    {
      name: 'Bubba',
      gender: 'male',
      persona_type: 'redneck',
      voice_description: 'Slow Southern drawl',
      accent_description: 'Rural South',
      vernacular: 'Y\'all, fixin\' to, reckon, bless your heart',
      worldview: 'Traditional, practical, family-oriented',
      comedy_styles: JSON.stringify(['anecdotal', 'character', 'prop']),
    },
    {
      name: 'Dixie',
      gender: 'female',
      persona_type: 'redneck',
      voice_description: 'Sweet Southern drawl',
      accent_description: 'Rural South',
      vernacular: 'Y\'all, fixin\' to, honey, bless your heart',
      worldview: 'Traditional, practical, family-oriented',
      comedy_styles: JSON.stringify(['anecdotal', 'character', 'prop']),
    },
    {
      name: 'Tex',
      gender: 'male',
      persona_type: 'cowboy',
      voice_description: 'Deep Texas twang',
      accent_description: 'Texas',
      vernacular: 'Howdy, partner, reckon, yonder',
      worldview: 'Independent, honorable, rugged',
      comedy_styles: JSON.stringify(['deadpan', 'character', 'anecdotal']),
    },
    {
      name: 'Dakota',
      gender: 'female',
      persona_type: 'cowboy',
      voice_description: 'Strong Texas twang',
      accent_description: 'Texas',
      vernacular: 'Howdy, partner, reckon, yonder',
      worldview: 'Independent, honorable, rugged',
      comedy_styles: JSON.stringify(['deadpan', 'character', 'anecdotal']),
    },
    {
      name: 'Chad',
      gender: 'male',
      persona_type: 'valley_girl',
      voice_description: 'High-pitched, uptalk, vocal fry',
      accent_description: 'Southern California',
      vernacular: 'Like, totally, omg, literally, for sure',
      worldview: 'Trendy, social media obsessed, superficial',
      comedy_styles: JSON.stringify(['character', 'observational', 'surreal']),
    },
    {
      name: 'Brittany',
      gender: 'female',
      persona_type: 'valley_girl',
      voice_description: 'High-pitched, uptalk, vocal fry',
      accent_description: 'Southern California',
      vernacular: 'Like, totally, omg, literally, for sure',
      worldview: 'Trendy, social media obsessed, superficial',
      comedy_styles: JSON.stringify(['character', 'observational', 'surreal']),
    },
    {
      name: 'River',
      gender: 'male',
      persona_type: 'portlandia_hipster',
      voice_description: 'Soft-spoken, thoughtful, slightly pretentious',
      accent_description: 'Pacific Northwest',
      vernacular: 'Artisanal, locally-sourced, sustainable, mindful',
      worldview: 'Eco-conscious, alternative, intellectual',
      comedy_styles: JSON.stringify(['satirical', 'deadpan', 'surreal']),
    },
    {
      name: 'Sage',
      gender: 'female',
      persona_type: 'portlandia_hipster',
      voice_description: 'Soft-spoken, thoughtful, slightly pretentious',
      accent_description: 'Pacific Northwest',
      vernacular: 'Artisanal, locally-sourced, sustainable, mindful',
      worldview: 'Eco-conscious, alternative, intellectual',
      comedy_styles: JSON.stringify(['satirical', 'deadpan', 'surreal']),
    },
  ];

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO characters 
    (name, gender, persona_type, voice_description, accent_description, vernacular, worldview, comedy_styles)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const char of defaultCharacters) {
    stmt.run(
      char.name,
      char.gender,
      char.persona_type,
      char.voice_description,
      char.accent_description,
      char.vernacular,
      char.worldview,
      char.comedy_styles
    );
  }
}

