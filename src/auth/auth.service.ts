import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { users } from '@prisma/client';
import { CryptoService } from 'src/crypto/crypto.service';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthRegisterDto } from './dtos/auth-register.dto';

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
        subject: '회원가입 이메일 인증 부탁드립니다.',
        text: '이메일 인증 관련 메일입니다.',
        html: `회원가입 인증코드를 입력해주세요.<br/> 인증코드: ${authCode}`,
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

  async register(dto: AuthRegisterDto) {
    const { email, password } = dto;

    const user = await this.usersService.findOne(email);
    if (user) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }
    const encodePassword = await this.cryptoService.encodePassword(password);

    const body = {
      ...dto,
      password,
      encodePassword,
    };

    await this.usersService.save(body);
    return true;
  }

  async login(email: string, password: string): Promise<users> {
    let user: users;
    user = await this.usersService.findOne(email);

    return user;
  }
}
