import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CharacterSearchParamsDTO {
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
  animagus: string;

  @IsOptional()
  @IsString()
  blood_status: string;

  @IsOptional()
  @IsString()
  boggart: string;

  @IsOptional()
  @IsString()
  born: string;

  @IsOptional()
  @IsString()
  died: string;

  @IsOptional()
  @IsString()
  eye_color: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  hair_color: string;

  @IsOptional()
  @IsString()
  height: string;

  @IsOptional()
  @IsString()
  house: string;

  @IsOptional()
  @IsString()
  marital_status: string;

  @IsOptional()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsString()
  patronus: string;

  @IsOptional()
  @IsString()
  skin_color: string;

  @IsOptional()
  @IsString()
  species: string;

  @IsOptional()
  @IsString()
  weight: string;
}