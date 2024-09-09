import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SpellSearchParamsDTO {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  creator: string;

  @IsOptional()
  @IsString()
  effect: string;

  @IsOptional()
  @IsString()
  hand: string;

  @IsOptional()
  @IsString()
  incantation: string;

  @IsOptional()
  @IsString()
  light: string;
}
