import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { SearchLimitDTO } from './dto/search.query.dto';
import { BookSearchParamsDTO } from './dto/book.search.params.dto';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@Controller('books')
@ApiTags('Books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
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
    type: BookSearchParamsDTO,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'List of books' })
  @ApiResponse({ status: 404, description: 'Books not found' })
  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: BookSearchParamsDTO,
  ) {
    return this.booksService.findAll(limit, page, searchParams);
  }

  @ApiOperation({ summary: 'Get a book by its UUID' })
  @ApiParam({ name: 'id', description: 'The UUID of the book', type: String })
  @ApiResponse({ status: 200, description: 'Book details' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.findOne(id);
  }
}
