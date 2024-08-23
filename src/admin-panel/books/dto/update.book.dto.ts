import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBookDTO } from './create.book.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateBookDTO extends PartialType(
  OmitType(CreateBookDTO, ['id']),
) {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
