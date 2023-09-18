import { Controller, Get, Inject, Logger, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {
    this.logger.log('Logging start auth controller');
  }

  @UseGuards(ThrottlerGuard)
  @Get()
  getHello(): void {
    this.logger.log('logging get method');

    this.usersService.findUserId();
  }
}
