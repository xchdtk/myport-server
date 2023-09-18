import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserId() {
    const data = await this.prisma.users.findFirst({
      where: {
        user_seq: 1,
      },
    });
    console.log('data', data);
  }
}
