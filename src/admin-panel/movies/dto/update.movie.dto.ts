import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateMovieDTO } from './create.movie.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateMovieDTO extends PartialType(
  OmitType(CreateMovieDTO, ['id']),
) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
