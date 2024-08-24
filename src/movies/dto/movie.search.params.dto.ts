import { IsOptional, IsString, IsUUID } from 'class-validator';

export class MovieSearchParamsDTO {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  slug: string;
  
  @IsOptional()
  @IsString()
  box_office: string;

  @IsOptional()
  @IsString()
  budget: string;
  
  @IsOptional()
  @IsString()
  rating: string;

  @IsOptional()
  @IsString()
  release_date: string;

  @IsOptional()
  @IsString()
  running_time: string;

  @IsOptional()
  @IsString()
  summary: string;

  @IsOptional()
  @IsString()
  title: string;
}
