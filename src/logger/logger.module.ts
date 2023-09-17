import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CustomLoggerMiddleware } from './logger.middleware';
import { CustomLoggerService } from './logger.service';

@Module({
  providers: [CustomLoggerService],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomLoggerMiddleware).forRoutes('*');
  }
}
