import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMovieDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  box_office: string;

  @IsNotEmpty()
  @IsString()
  budget: string;

  @IsNotEmpty()
  @IsArray()
  cinematographers: string[];

  @IsNotEmpty()
  @IsArray()
  directors: string[];

  @IsNotEmpty()
  @IsArray()
  distributors: string[];

  @IsNotEmpty()
  @IsArray()
  editors: string[];

  @IsNotEmpty()
  @IsArray()
  music_composers: string[];

  @IsNotEmpty()
  @IsString()
  poster: string;

  @IsNotEmpty()
  @IsArray()
  producers: string[];

  @IsNotEmpty()
  @IsString()
  rating: string;

  @IsNotEmpty()
  @IsString()
  release_date: string;

  @IsNotEmpty()
  @IsString()
  running_time: string;

  @IsNotEmpty()
  @IsArray()
  screenwriters: string[];

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  trailer: string;

  @IsNotEmpty()
  @IsString()
  wiki: string;
}
