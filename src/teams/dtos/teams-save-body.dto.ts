import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class TeamsSaveBodyDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  detailDescription: string;

  @IsOptional()
  @IsString()
  recruitment: string;
}
