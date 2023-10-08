import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailType } from './types/send_mail_type';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(body: SendMailType): Promise<void> {
    await this.mailerService.sendMail(body);
  }
}
