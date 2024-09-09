import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCharacterDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  animagus: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  blood_status: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  boggart: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  born: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  died: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  eye_color: string;

  @IsNotEmpty()
  @IsArray()
  family_members: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  hair_color: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  height: string;
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  house: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsArray()
  jobs: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  marital_status: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  patronus: string;

  @IsNotEmpty()
  @IsArray()
  romances: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  skin_color: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  species: string;

  @IsNotEmpty()
  @IsArray()
  titles: string[];

  @IsNotEmpty()
  @IsArray()
  wands: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  weight: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  wiki: string;
}
