import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BookSearchParamsDTO } from './dto/book.search.params.dto';
import { SEARCH_RESULT_LIMIT } from 'src/consts';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    limit: number = SEARCH_RESULT_LIMIT,
    page: number = 1,
    searchParams?: BookSearchParamsDTO,
  ) {
    try {
      const whereConditions = this.findConditions(searchParams);
      const skip = (page - 1) * limit;

      const data = await this.prisma.book.findMany({
        take: limit,
        where: whereConditions,
        skip,
      });

      if (data.length < 1) {
        throw new NotFoundException('Books not found');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const book = await this.prisma.book.findUnique({
        where: { id },
      });

      if (!book) {
        throw new NotFoundException(`Book with id - ${id} not found`);
      }

      return book;
    } catch (error) {
      throw error;
    }
  }

  private findConditions(searchParams: BookSearchParamsDTO) {
    const whereConditions: any = {};

    if (searchParams) {
      if (searchParams.id) whereConditions.id = searchParams.id;
      if (searchParams.slug)
        whereConditions.slug = {
          contains: searchParams.slug,
          mode: 'insensitive',
        };
      if (searchParams.author)
        whereConditions.author = {
          contains: searchParams.author,
          mode: 'insensitive',
        };
      if (searchParams.cover)
        whereConditions.cover = {
          contains: searchParams.cover,
          mode: 'insensitive',
        };
      if (searchParams.dedication)
        whereConditions.dedication = {
          contains: searchParams.dedication,
          mode: 'insensitive',
        };
      if (searchParams.pages) whereConditions.pages = searchParams.pages;
      if (searchParams.title)
        whereConditions.title = {
          contains: searchParams.title,
          mode: 'insensitive',
        };
    }

    return whereConditions;
  }
}
