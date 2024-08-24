import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePotionDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  characteristics: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  difficulty: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  effect: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  inventors: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  ingredients: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  manufacturers: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  side_effects: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  time: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  wiki: string;
}
