import { IsOptional, IsString, IsUUID } from "class-validator";

export class PotionSearchParamsDTO{
    @IsOptional()
    @IsUUID()
    id: string;
  
    @IsOptional()
    @IsString()
    slug: string;
    
    @IsOptional()
    @IsString()
    characteristics: string;
  
    @IsOptional()
    @IsString()
    difficulty: string;
    
    @IsOptional()
    @IsString()
    effect: string;
  
    @IsOptional()
    @IsString()
    inventors: string;
  
    @IsOptional()
    @IsString()
    ingredients: string;
  
    @IsOptional()
    @IsString()
    manufacturers: string;
  
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    side_effects: string;

    @IsOptional()
    @IsString()
    time: string;
}