import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [],
  controllers: [TeamsController],
  providers: [TeamsService, UsersService, PrismaService, S3Service],
})
export class TeamsModule {}
