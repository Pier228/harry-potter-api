import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { SearchLimitDTO } from './dto/search.query.dto';
import { BookSearchParamsDTO } from './dto/book.search.params.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: BookSearchParamsDTO,
  ) {
    return this.booksService.findAll(limit, page, searchParams);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.findOne(id);
  }
}
