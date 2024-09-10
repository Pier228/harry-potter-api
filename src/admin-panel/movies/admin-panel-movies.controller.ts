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
import { ApiTags } from '@nestjs/swagger';

@Controller('admin-panel/movies')
@ApiTags('Admin Panel - Movies')
@UseGuards(AuthGuard)
export class AdminPanelMoviesController {
  constructor(private readonly moviesService: AdminPanelMoviesService) {}

  @Post()
  async addMovie(@Body() data: CreateMovieDTO) {
    return this.moviesService.createMovie(data);
  }

  @Post('fill')
  async addManyMovies(@Body() data: CreateMovieDTO[]) {
    return this.moviesService.createManyMovies(data);
  }

  @Post('fill-template')
  async fillTemplate() {
    return this.moviesService.fillTemplate();
  }

  @Delete(':id')
  async deleteMovie(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.deleteMovie(id);
  }

  @Patch()
  async updateMovie(@Body() data: UpdateMovieDTO) {
    return this.moviesService.updateMovie(data);
  }
}
