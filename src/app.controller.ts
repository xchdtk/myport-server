import { Controller, Get, Logger } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor() {}

  @Get()
  async getHello(): Promise<string> {
    console.log('app controller');

    return 'success';
  }
}
