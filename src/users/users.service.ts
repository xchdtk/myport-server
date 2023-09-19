import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<users> {
    const data = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    console.log('data', data);

    return data;
  }
}
