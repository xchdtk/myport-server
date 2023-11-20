import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Get,
  Post,
  UseGuards,
  Query,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UploadedFiles,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from 'src/auth/auth.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/users/decorators/user.decorator';
import { TeamsSaveBodyDto } from './dtos/teams-save-body.dto';
import { TeamsService } from './teams.service';
import { teams, user_teams, users } from '@prisma/client';
import { TeamGetQueryDto } from './dtos/teams-get-query.dto';
import { TeamsApplyBodyDto } from './dtos/teams-apply-body.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@ApiTags('팀 관련 API')
@ApiResponse({
  status: 200,
  description: 'success',
})
@Controller('teams')
export class TeamsController {
  private readonly logger = new Logger(TeamsController.name);

  constructor(private readonly teamService: TeamsService) {
    this.logger.log('Logging start auth controller');
  }

  // 팀 조회 및 생성 및 수정
  @ApiOperation({
    summary: '팀 조회 API',
    description: '팀 조회 API',
  })
  @UseGuards(ThrottlerGuard)
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getTeams(
    @AuthUser() user: users,
    @Query() query: TeamGetQueryDto,
  ): Promise<teams[]> {
    return await this.teamService.getTeams(user, query);
  }

  @ApiOperation({
    summary: '유저 팀 조회 API',
    description: '유저 팀 조회 API',
  })
  @UseGuards(ThrottlerGuard)
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/user')
  async getUserTeams(@AuthUser() user: users): Promise<
    {
      team: {
        team_seq: true;
        name: string;
        description: string;
        status: string;
        create_date: Date;
        type: string;
        userTeams: user_teams;
      };
    }[]
  > {
    return await this.teamService.getUserTeams(user);
  }

  @ApiOperation({
    summary: '특정 팀 조회 API',
    description: '특정 팀 조회 API',
  })
  @UseGuards(ThrottlerGuard)
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/:teamSeq')
  async getTeam(
    @AuthUser() user: users,
    @Param('teamSeq') teamSeq: string,
  ): Promise<{
    type: string;
    name: string;
    description: string;
    detail_description: string;
    user_seq: number;
    status: string;
    thumbnail_image_url: string;
    recruitment: string;
    leader: boolean;
    member: boolean;
    support: boolean;
    team_user: any;
    recruitment_team: any;
  }> {
    const team = await this.teamService.getTeam(user, Number(teamSeq));
    return team;
  }

  @ApiOperation({
    summary: '팀 생성 API',
    description: '팀 생성 API',
  })
  @UseGuards(ThrottlerGuard)
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'type', maxCount: 1 },
      { name: 'name', maxCount: 1 },
      { name: 'description', maxCount: 1 },
      { name: 'detailDescription', maxCount: 1 },
      { name: 'recruitment', maxCount: 1 },
      { name: 'file', maxCount: 1 },
    ]),
  )
  async saveTeams(
    @AuthUser() user: users,
    @Body() dto: TeamsSaveBodyDto,
    @UploadedFiles() files: { file: Express.Multer.File[] },
  ): Promise<void> {
    await this.teamService.saveTeam(dto, user, files?.file[0]);
  }

  // 팀 지원
  @ApiOperation({
    summary: '팀 지원 API',
    description: '팀 지원 API',
  })
  @UseGuards(ThrottlerGuard)
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/applications')
  async applyTeams(
    @AuthUser() user: users,
    @Body() dto: TeamsApplyBodyDto,
  ): Promise<void> {
    await this.teamService.applyTeam(dto, user);
  }
}
