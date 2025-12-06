import fs from 'fs';
import path from 'path';

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  userId?: number;
  ip?: string;
}

class Logger {
  private logDir: string;
  private logFile: string;

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.logFile = path.join(this.logDir, `app-${new Date().toISOString().split('T')[0]}.log`);
    
    // Ensure log directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private writeLog(level: LogLevel, message: string, data?: any, userId?: number, ip?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      userId,
      ip,
    };

    // Console output
    const consoleMessage = `[${entry.timestamp}] ${level}: ${message}`;
    if (level === LogLevel.ERROR) {
      console.error(consoleMessage, data || '');
    } else if (level === LogLevel.WARN) {
      console.warn(consoleMessage, data || '');
    } else {
      console.log(consoleMessage, data || '');
    }

    // File output (async, don't block)
    const logLine = JSON.stringify(entry) + '\n';
    fs.appendFile(this.logFile, logLine, (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);
      }
    });
  }

  error(message: string, data?: any, userId?: number, ip?: string) {
    this.writeLog(LogLevel.ERROR, message, data, userId, ip);
  }

  warn(message: string, data?: any, userId?: number, ip?: string) {
    this.writeLog(LogLevel.WARN, message, data, userId, ip);
  }

  info(message: string, data?: any, userId?: number, ip?: string) {
    this.writeLog(LogLevel.INFO, message, data, userId, ip);
  }

  debug(message: string, data?: any, userId?: number, ip?: string) {
    if (process.env.NODE_ENV === 'development') {
      this.writeLog(LogLevel.DEBUG, message, data, userId, ip);
    }
  }
}

export const logger = new Logger();

