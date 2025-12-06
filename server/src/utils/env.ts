import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  DATABASE_PATH: string;
  OPENAI_API_KEY: string;
  TOTP_ISSUER: string;
  CRISIS_HOTLINE: string;
  ADMIN_EMAILS: string[];
  ENCRYPTION_KEY: string;
  CLIENT_URL: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
}

function validateEnv(): EnvConfig {
  const required = [
    'JWT_SECRET',
    'OPENAI_API_KEY',
    'ENCRYPTION_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET!.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }

  // Validate ENCRYPTION_KEY length
  if (process.env.ENCRYPTION_KEY!.length < 32) {
    throw new Error('ENCRYPTION_KEY must be at least 32 characters long');
  }

  return {
    PORT: parseInt(process.env.PORT || '3001', 10),
    NODE_ENV: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    DATABASE_PATH: process.env.DATABASE_PATH || './data/crazyfriend.db',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
    TOTP_ISSUER: process.env.TOTP_ISSUER || 'Crazy Friend',
    CRISIS_HOTLINE: process.env.CRISIS_HOTLINE || '988',
    ADMIN_EMAILS: (process.env.ADMIN_EMAILS || '').split(',').filter(Boolean),
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY!,
    CLIENT_URL: process.env.CLIENT_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5173'),
    RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  };
}

export const env = validateEnv();

