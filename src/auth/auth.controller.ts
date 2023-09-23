import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UsersService } from 'src/users/users.service';
import { users } from '@prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthEmail } from './enums/email.enum';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

@ApiTags('인증 API')
@ApiResponse({
  status: 200,
  description: 'success',
})
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    this.logger.log('Logging start auth controller');
  }

  @ApiOperation({
    summary: '회원가입 이메일 인증 API',
    description: '회원가입 이메일 인증에 관한 모든 코드를 담고 있습니다.',
  })
  @ApiQuery({
    name: 'email',
    enum: [AuthEmail.Email],
  })
  @Get('/email')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  async authEmail(@Query('email') email): Promise<string> {
    const authCode = await this.authService.authEmail(email);
    console.log('authCode', authCode);
    return authCode;
  }

  @Post('/login')
  @UseGuards(ThrottlerGuard)
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  async login(user: users): Promise<users> {
    return user;
  }
}
