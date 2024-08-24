import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchLimitDTO } from 'src/books/dto/search.query.dto';
import { MovieSearchParamsDTO } from './dto/movie.search.params.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: MovieSearchParamsDTO,
  ) {
    return this.moviesService.findAll(limit, page, searchParams);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.findOne(id);
  }
}
