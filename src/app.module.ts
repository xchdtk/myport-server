import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CryptoModule } from './crypto/crypto.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    LoggerModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    CryptoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
