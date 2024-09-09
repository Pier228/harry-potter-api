import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateCharacterDTO } from './create.character.dto';

export class UpdateCharacterDTO extends PartialType(
    OmitType(CreateCharacterDTO, ['id']),
  ) {
    @IsNotEmpty()
    @IsUUID()
    id: string;
  }