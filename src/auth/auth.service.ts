import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { users } from '@prisma/client';
import { CryptoService } from 'src/crypto/crypto.service';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async authEmail(email: string): Promise<string> {
    try {
      const authCode = Math.random().toString(36).substring(2, 11);
      const body = {
        to: email,
        from: `Folio <${process.env.MAIL_USER}>`,
        subject: '이메일 인증 부탁드립니다.',
        text: '이메일 인증 관련 메일입니다.',
        html: `인증코드를 입력해주세요.<br/> 인증코드: ${authCode}`,
      };
      await this.mailService.sendMail(body);

      return authCode;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  signToken(user: users): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async verifyPayload(payload: JwtPayload): Promise<users> {
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      throw new BadRequestException('유저를 찾을 수 없습니다.');
    }
    return user;
  }

  async login(email: string, password: string): Promise<users> {
    let user: users;
    console.log('들어오니??');
    console.log(
      'encode_password',
      await this.cryptoService.encodePassword(password),
    );
    user = await this.usersService.findOne(email);
    console.log('user', user);
    console.log(
      'decode_password',
      await this.cryptoService.decodePassword(user?.password),
    );

    return user;
  }
}
