import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HashModule } from './hash/hash.module';
import appConfig from './config/app.config';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    LoggerModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    HashModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
