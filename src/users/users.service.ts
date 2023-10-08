import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, users } from '@prisma/client';
import { AuthRegisterDto } from 'src/auth/dtos/auth-register.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<users> {
    const data = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    return data;
  }

  async save(dto: AuthRegisterDto) {
    const { name, email, password, phone } = dto;
    await this.prisma.users.create({
      data: {
        name,
        email,
        password,
        phone,
        birth_date: '',
        status: '',
        interests: '',
        introduce: '',
        create_date: new Date(),
        modify_date: new Date(),
      },
    });
  }
}
