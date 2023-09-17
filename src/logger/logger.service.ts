import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import { storage } from './logger.middleware';

const COLORS = {
  BLACK: '\u001b[30m',
  RED: '\u001b[31m',
  GREEN: '\u001b[32m',
  YELLOW: '\u001b[33m',
  BLUE: '\u001b[34m',
  MAGENTA: '\u001b[35m',
  CYAN: '\u001b[36m',
  WHITE: '\u001b[37m',
  END: '\u001b[0m',
};

@Injectable()
export class CustomLoggerService implements LoggerService {
  constructor() {}
  private write(level: LogLevel, ...args: unknown[]) {
    const time = new Date()
      .toISOString()
      .replace('-', '/g')
      .replace('T', ' ')
      .replace(/\..+/, '');
    const requestId = storage.getStore();
    const context = args.pop();
    const message = args.shift();

    const logString = requestId
      ? `${level.toUpperCase()} [${requestId}] [${context}] ${message}`
      : `${level.toUpperCase()} [${context}] ${message}`;

    const color =
      level === 'log'
        ? COLORS.GREEN
        : level === 'warn'
        ? COLORS.YELLOW
        : COLORS.RED;

    if (process.env.NO_COLOR === 'true') {
      console.log(time, logString);
    } else {
      console.log(time, this.colorize(logString, color));
    }
  }

  private colorize(
    message: string,
    color: (typeof COLORS)[keyof typeof COLORS],
  ) {
    return color + message + COLORS.END;
  }

  log(...args: unknown[]) {
    this.write('log', ...args);
  }

  warn(...args: unknown[]) {
    this.write('warn', ...args);
  }

  error(...args: unknown[]) {
    this.write('error', ...args);
  }
}
