import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  UseGuards,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { users } from '@prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthEmail } from './enums/email.enum';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { AuthUser } from '../users/decorators/user.decorator';

@ApiTags('인증 API')
@ApiResponse({
  status: 200,
  description: 'success',
})
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {
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
    return authCode;
  }

  @ApiOperation({
    summary: '회원가입 API',
    description: '회원가입 API',
  })
  @Post('/register')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  async authRegister(@Body() dto: AuthRegisterDto): Promise<void> {
    await this.authService.register(dto);
    return;
  }

  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 API',
  })
  @Post('/login')
  @UseGuards(ThrottlerGuard)
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user): Promise<{ token: { access: string } }> {
    const accessToken = await this.authService.signToken(user);
    return {
      token: {
        access: accessToken,
      },
    };
  }
}
