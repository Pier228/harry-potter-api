import { Injectable, NotFoundException } from '@nestjs/common';
import { SEARCH_RESULT_LIMIT } from 'src/consts';
import { PrismaService } from 'src/prisma.service';
import { MovieSearchParamsDTO } from './dto/movie.search.params.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    limit: number = SEARCH_RESULT_LIMIT,
    page: number = 1,
    searchParams?: MovieSearchParamsDTO,
  ) {
    try {
      const whereConditions = this.findConditions(searchParams);
      const skip = (page - 1) * limit;

      const data = await this.prisma.movie.findMany({
        take: limit,
        where: whereConditions,
        skip,
      });

      if (data.length < 1) {
        throw new NotFoundException('Movies not found');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const movie = await this.prisma.movie.findUnique({
        where: { id },
      });

      if (!movie) {
        throw new NotFoundException(`Movie with id - ${id} not found`);
      }

      return movie;
    } catch (error) {
      throw error;
    }
  }

  private findConditions(searchParams: MovieSearchParamsDTO) {
    const whereConditions: any = {};

    if (searchParams) {
      if (searchParams.id) whereConditions.id = searchParams.id;
      if (searchParams.slug)
        whereConditions.slug = {
          contains: searchParams.slug,
          mode: 'insensitive',
        };
      if (searchParams.box_office)
        whereConditions.box_office = {
          contains: searchParams.box_office,
          mode: 'insensitive',
        };
      if (searchParams.budget)
        whereConditions.budget = {
          contains: searchParams.budget,
          mode: 'insensitive',
        };
      if (searchParams.rating)
        whereConditions.rating = {
          contains: searchParams.rating,
          mode: 'insensitive',
        };
      if (searchParams.title)
        whereConditions.title = {
          contains: searchParams.title,
          mode: 'insensitive',
        };
      if (searchParams.release_date)
        whereConditions.release_date = {
          contains: searchParams.release_date,
          mode: 'insensitive',
        };
      if (searchParams.summary)
        whereConditions.summary = {
          contains: searchParams.summary,
          mode: 'insensitive',
        };
    }

    return whereConditions;
  }
}
