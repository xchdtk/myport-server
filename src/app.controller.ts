import { Controller, Get, Logger } from '@nestjs/common';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor() {}

  @Get('/hello')
  getHello(): void {
    this.logger.log('Logging at controller');
    this.logger.warn('Logging at controller');
    this.logger.error('Logging at controller');
  }
}
