import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class BookSearchParamsDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  cover?: string;

  @IsString()
  @IsOptional()
  dedication?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  pages?: number;

  @IsString()
  @IsOptional()
  title?: string;
}
