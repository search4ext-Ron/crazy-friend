import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// Additional security headers
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
}

// Request ID for tracing
export function requestId(req: Request, res: Response, next: NextFunction) {
  const requestId = Math.random().toString(36).substring(2, 15);
  req.headers['x-request-id'] = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
}

// IP whitelist (optional, for admin routes)
export function ipWhitelist(allowedIPs: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIP = req.ip || req.socket.remoteAddress || '';
    
    if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP)) {
      logger.warn('IP not whitelisted', { ip: clientIP, path: req.path });
      return res.status(403).json({ error: 'Access denied' });
    }
    
    next();
  };
}

// SQL injection prevention (additional layer)
export function sanitizeSQL(input: string): string {
  // Remove SQL keywords and special characters
  const dangerous = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)|(--)|(\/\*)|(\*\/)|(;)/gi;
  return input.replace(dangerous, '');
}

