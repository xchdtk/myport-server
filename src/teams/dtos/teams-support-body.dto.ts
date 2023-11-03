import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TeamsSupportBodyDto {
  @IsNotEmpty()
  @IsNumber()
  team_seq: number;
}
