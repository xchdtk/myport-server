import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt,
  createHash,
  CipherCCM,
  DecipherCCM,
} from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService {
  private readonly passwordKey: Buffer;
  private readonly passwordIv: Buffer;
  constructor() {
    this.passwordKey = randomBytes(32);
    this.passwordIv = randomBytes(16);
  }

  async encodePassword(value: string) {
    const cipher = createCipheriv(
      'aes-256-cbc',
      this.passwordKey,
      this.passwordIv,
    );
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  async decodePassword(value: string) {
    const decipher = createDecipheriv(
      'aes-256-cbc',
      this.passwordKey,
      this.passwordIv,
    );
    let decrypted = decipher.update(value, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
