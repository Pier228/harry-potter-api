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
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Get all movies' })
  @ApiQuery({
    name: 'limit',
    description: 'Results limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Current page number',
    type: Number,
    required: false,
  })
  @ApiBody({
    description: 'Search parameters',
    type: MovieSearchParamsDTO,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'List of movies' })
  @ApiResponse({ status: 404, description: 'Movies not found' })
  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: MovieSearchParamsDTO,
  ) {
    return this.moviesService.findAll(limit, page, searchParams);
  }

  @ApiOperation({ summary: 'Get a movie by its UUID' })
  @ApiParam({ name: 'id', description: 'The UUID of the movie', type: String })
  @ApiResponse({ status: 200, description: 'Movie details' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.findOne(id);
  }
}
