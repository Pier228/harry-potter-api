import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateSpellDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  creator: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  effect: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  hand: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  incantation: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  light: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  wiki: string;
}
