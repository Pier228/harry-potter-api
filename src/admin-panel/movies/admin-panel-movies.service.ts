import {
  BadGatewayException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMovieDTO } from './dto/create.movie.dto';
import { Movie } from '@prisma/client';
import { UpdateMovieDTO } from './dto/update.movie.dto';

@Injectable()
export class AdminPanelMoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovie(data: CreateMovieDTO) {
    try {
      const movie = await this.isExist(data.id, data.slug);

      if (movie) {
        throw new ConflictException(
          'Movie with this id or slug already exists',
        );
      }

      const response = await this.prisma.movie.create({ data });

      if (!response) {
        throw new BadGatewayException('Cannot create movie');
      }

      return { message: 'Movie created successfully' };
    } catch (error) {
      throw error;
    }
  }

  async createManyMovies(data: CreateMovieDTO[]) {
    try {
      const response = await this.prisma.movie.createMany({
        data,
        skipDuplicates: true,
      });

      if (!response) {
        throw new BadGatewayException('Cannot create movie');
      }

      return { message: 'Movies created successfully', response };
    } catch (error) {
      throw error;
    }
  }

  async fillTemplate() {
    try {
      const templateData = await fetch('https://api.potterdb.com/v1/movies');

      if (!templateData) {
        throw new BadGatewayException('Cannot fetch template data');
      }

      const templateJson = await templateData.json();

      const data = templateJson.data.map((el) => {
        return { id: el.id, ...el.attributes };
      });

      const response = await this.prisma.movie.createMany({
        data,
        skipDuplicates: true,
      });

      if (!response) {
        throw new BadGatewayException('Cannot create movies');
      }

      return { message: 'Template filled successfully', response };
    } catch (error) {
      throw error;
    }
  }

  async deleteMovie(id: string) {
    try {
      const isExist = await this.isExist(id);

      if (!isExist) {
        throw new NotFoundException(`Movie with id - ${id} not found`);
      }

      const response = await this.prisma.movie.delete({ where: { id } });

      if (!response) {
        throw new BadGatewayException('Cannot delete movie');
      }

      return { message: 'Movie deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async updateMovie(data: UpdateMovieDTO) {
    try {
      const isExist = await this.isExist(data.id);

      if (!isExist) {
        throw new NotFoundException(`Movie with id - ${data.id} not found`);
      }

      const response = await this.prisma.movie.update({
        where: { id: data.id },
        data: data,
      });

      if (!response) {
        throw new BadGatewayException('Cannot update movie');
      }

      return { message: 'Movie updated successfully', response };
    } catch (error) {
      throw error;
    }
  }

  private async isExist(id: string, slug?: string) {
    try {
      let movie: Movie | null;
      movie = await this.prisma.movie.findUnique({ where: { id } });

      if (!movie && slug) {
        movie = await this.prisma.movie.findUnique({ where: { slug } });
      }

      return movie;
    } catch (error) {
      throw error;
    }
  }
}
