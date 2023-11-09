import { BadRequestException, Injectable } from '@nestjs/common';
import { users, teams, user_teams } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { TeamsSaveBodyDto } from './dtos/teams-save-body.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamStatus } from './enums/team-status.enum';
import { UserTeamRole } from './enums/user-team-role.enum';
import { TeamsApplyBodyDto } from './dtos/teams-apply-body.dto';
import { ApiBadRequestResponse } from '@nestjs/swagger';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async getTeams(
    user: users,
    query: {
      page?: number;
      limit?: number;
      searchWord?: string;
      type?: string;
    },
  ): Promise<teams[]> {
    const { page = 0, limit = 10, searchWord = '', type = '' } = query;
    const teams = await this.prisma.teams.findMany({
      where: {
        status: TeamStatus.recruiting,
        NOT: {
          user_seq: user.user_seq,
        },
        ...(searchWord ? { name: searchWord } : {}),
        ...(type ? { type } : {}),
      },
      skip: page,
      take: limit,
    });

    return teams;
  }

  async getTeam(
    user: users,
    teamSeq: number,
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
    const team = await this.prisma.teams.findUnique({
      where: {
        team_seq: teamSeq,
      },
      select: {
        type: true,
        name: true,
        description: true,
        detail_description: true,
        user_seq: true,
        status: true,
        thumbnail_image_url: true,
        recruitment: true,
      },
    });

    const teamUsers = await this.prisma.user_teams.findMany({
      where: {
        team_seq: teamSeq,
      },
      include: {
        user: true,
      },
    });

    const recruitmentTeam = await this.prisma.recruitment_teams.findMany({
      where: {
        team_seq: teamSeq,
      },
      include: {
        user: true,
      },
    });

    return {
      ...team,
      leader: team?.user_seq === user.user_seq,
      member: teamUsers?.some((data) => data.user_seq === user.user_seq),
      support: recruitmentTeam?.some((data) => data.user_seq === user.user_seq),
      team_user: teamUsers,
      recruitment_team: recruitmentTeam,
    };
  }

  async getUserTeams(user: users): Promise<
    {
      team: {
        team_seq: true;
        name: string;
        description: string;
        status: string;
        type: string;
        create_date: Date;
        userTeams: user_teams;
      };
    }[]
  > {
    const returnDatas = [];
    const userTeams = await this.prisma.user_teams.findMany({
      where: {
        user_seq: user.user_seq,
      },
    });

    for (const userTeam of userTeams) {
      const team = await this.prisma.teams.findUnique({
        select: {
          team_seq: true,
          name: true,
          description: true,
          status: true,
          type: true,
          create_date: true,
        },
        where: {
          team_seq: userTeam?.team_seq,
        },
      });
      returnDatas.push({
        team: {
          ...team,
          userTeam,
        },
      });
    }

    return returnDatas;
  }

  async saveTeam(dto: TeamsSaveBodyDto, user: users): Promise<void> {
    const { type, name, description, detailDescription, recruitment } = dto;
    const team = await this.prisma.teams.create({
      data: {
        type,
        name,
        description,
        detail_description: detailDescription,
        recruitment,
        thumbnail_image_url: '',
        status: TeamStatus.recruiting,
        user_seq: user?.user_seq,
        create_date: new Date(),
        modify_date: new Date(),
      },
    });

    await this.prisma.user_teams.create({
      data: {
        user_seq: user?.user_seq,
        user_role: UserTeamRole.Leader,
        team_seq: team?.team_seq,
        create_date: new Date(),
        modify_date: new Date(),
      },
    });
  }

  async applyTeam(dto: TeamsApplyBodyDto, user: users): Promise<void> {
    const { team_seq } = dto;

    const team = await this.prisma.teams.findUnique({
      where: {
        team_seq,
      },
    });

    if (!team) {
      throw new BadRequestException('팀을 찾을 수 없습니다.');
    }

    const teamUser = await this.prisma.user_teams.findFirst({
      where: {
        team_seq,
        user_seq: user.user_seq,
      },
      select: {
        user_team_seq: true,
      },
    });

    if (teamUser) {
      throw new BadRequestException('이미 팀에 속해있습니다.');
    }

    const recruitmentTeam = await this.prisma.recruitment_teams.findFirst({
      where: {
        team_seq,
        user_seq: user.user_seq,
      },
      select: {
        recruitement_team_seq: true,
      },
    });

    if (recruitmentTeam) {
      throw new BadRequestException('이미 지원하였습니다.');
    }

    await this.prisma.recruitment_teams.create({
      data: {
        team_seq: team_seq,
        user_seq: user.user_seq,
        job: '개발자',
        status: 'WAITING',
        create_date: new Date(),
        modify_date: new Date(),
      },
    });
  }
}
