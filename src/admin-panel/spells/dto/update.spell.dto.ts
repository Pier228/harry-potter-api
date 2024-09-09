import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateSpellDTO } from './create.spell.dto';

export class UpdateSpellDTO extends PartialType(
    OmitType(CreateSpellDTO, ['id']),
  ) {
    @IsNotEmpty()
    @IsUUID()
    id: string;
  }