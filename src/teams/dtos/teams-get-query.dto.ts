import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TeamGetQueryDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  searchWord: string;

  @IsOptional()
  @IsString()
  type: string;
}
