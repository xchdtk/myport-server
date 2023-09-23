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
  private readonly passwordKey: string;
  private readonly passwordIv: Buffer;
  constructor() {
    this.passwordKey = 'tpdlsdkgodqhrgkwk11230708@';
    this.passwordIv = randomBytes(16);
  }

  async encodePassword(value: string) {
    const key = (await promisify(scrypt)(
      this.passwordKey,
      'salt',
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.passwordIv);
    const encryptedText = Buffer.concat([cipher.update(value), cipher.final()]);

    return encryptedText.toString();
  }

  async decodePassword(value: string) {
    const key = (await promisify(scrypt)(
      this.passwordKey,
      'salt',
      32,
    )) as Buffer;
    const bufferValue = Buffer.from(value);
    const decipher = createDecipheriv('aes-256-ctr', key, this.passwordIv);
    const decryptedText = Buffer.concat([
      decipher.update(bufferValue),
      decipher.final(),
    ]);

    return decryptedText.toString();
  }
}
