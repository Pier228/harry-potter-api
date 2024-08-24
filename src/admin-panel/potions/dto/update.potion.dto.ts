import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePotionDTO } from './create.potion.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdatePotionDTO extends PartialType(
  OmitType(CreatePotionDTO, ['id']),
) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
