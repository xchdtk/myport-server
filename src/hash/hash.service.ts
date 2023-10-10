import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly passwordKey: Buffer;
  private readonly ivLength: number;
  constructor() {
    this.passwordKey = Buffer.from('014415fdafdafafsafasfasfafaf', 'hex');
    this.ivLength = 16;
  }

  async hash(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async compare(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}
