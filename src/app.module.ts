import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { AppController } from './app.controller';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
