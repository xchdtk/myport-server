import { Type } from 'class-transformer';
import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TeamGetQueryDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  type: string;
}
