import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UsersService } from 'src/users/users.service';
import { users } from '@prisma/client';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {
    this.logger.log('Logging start auth controller');
  }

  // @Post('/login')
  // @UseGuards(ThrottlerGuard)
  // @HttpCode(HttpStatus.OK)
  // async login(
  //   // @AuthUser() user: users
  // ): Promise<users> {
  //   return 'user';
  // }
}
