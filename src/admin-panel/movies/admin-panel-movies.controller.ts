import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminPanelMoviesService } from './admin-panel-movies.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateMovieDTO } from './dto/create.movie.dto';
import { UpdateMovieDTO } from './dto/update.movie.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('admin-panel/movies')
@ApiTags('Admin Panel - Movies')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AdminPanelMoviesController {
  constructor(private readonly moviesService: AdminPanelMoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new movie' })
  @ApiBody({ type: CreateMovieDTO })
  @ApiResponse({
    status: 201,
    description: 'Movie has been successfully added.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'Movie with this id or slug already exists.' })
  async addMovie(@Body() data: CreateMovieDTO) {
    return this.moviesService.createMovie(data);
  }

  @Post('fill')
  @ApiOperation({ summary: 'Add multiple movies' })
  @ApiBody({ type: [CreateMovieDTO] })
  @ApiResponse({ status: 201, description: 'Movies have been successfully added.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async addManyMovies(@Body() data: CreateMovieDTO[]) {
    return this.moviesService.createManyMovies(data);
  }

  @Post('fill-template')
  @ApiOperation({ summary: 'Fill movies from a predefined template' })
  @ApiResponse({ status: 201, description: 'Template has been successfully filled with movies.' })
  @ApiResponse({ status: 502, description: 'Cannot fetch template data.' })
  async fillTemplate() {
    return this.moviesService.fillTemplate();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie by UUID' })
  @ApiParam({ name: 'id', description: 'UUID of the movie to be deleted' })
  @ApiResponse({ status: 200, description: 'Movie has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete movie.' })
  async deleteMovie(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.deleteMovie(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update an existing movie' })
  @ApiBody({ type: UpdateMovieDTO })
  @ApiResponse({ status: 200, description: 'Movie has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete movie.' })
  async updateMovie(@Body() data: UpdateMovieDTO) {
    return this.moviesService.updateMovie(data);
  }
}
