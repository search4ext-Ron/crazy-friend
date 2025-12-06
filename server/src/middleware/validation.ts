import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  twoFactorCode: z.string().optional(),
});

export const profileSchema = z.object({
  age: z.number().int().min(13).max(120).optional().nullable(),
  sex: z.enum(['male', 'female', 'other']).optional().nullable(),
  ethnicity: z.string().max(100).optional().nullable(),
  sexual_orientation: z.string().max(50).optional().nullable(),
  location: z.string().max(200).optional().nullable(),
  preferred_comedy_styles: z.array(z.string()).max(3).optional().nullable(),
});

export const messageSchema = z.object({
  sessionId: z.number().int().positive(),
  message: z.string().min(1).max(5000, 'Message too long'),
  isVoice: z.boolean().optional(),
});

export const sessionSchema = z.object({
  characterId: z.number().int().positive(),
  comedyStyles: z.array(z.string()).max(3).optional(),
});

// Validation middleware factory
export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        });
      }
      next(error);
    }
  };
}

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Rate limiting per user
export function createUserRateLimit() {
  const userRequestCounts = new Map<string, { count: number; resetTime: number }>();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100;

  return (req: any, res: Response, next: NextFunction) => {
    const userId = req.userId?.toString() || req.ip;
    const now = Date.now();
    const userLimit = userRequestCounts.get(userId);

    if (!userLimit || now > userLimit.resetTime) {
      userRequestCounts.set(userId, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (userLimit.count >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((userLimit.resetTime - now) / 1000),
      });
    }

    userLimit.count++;
    next();
  };
}

