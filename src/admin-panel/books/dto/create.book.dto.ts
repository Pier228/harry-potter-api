import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  cover: string;

  @IsNotEmpty()
  @IsString()
  dedication: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  pages: number;

  @IsNotEmpty()
  @IsDateString()
  release_date: string;

  @IsNotEmpty()
  @IsString()
  summary: string;
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  wiki: string;
}
