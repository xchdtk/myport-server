import { Type } from 'class-transformer';
import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TeamsApplyBodyDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  team_seq: number;
}
