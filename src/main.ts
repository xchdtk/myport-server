import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
    bufferLogs: true,
  });
  await app.listen(3000);
}
bootstrap();
