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
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateBookDTO } from './dto/create.book.dto';
import { AdminPanelBooksService } from './admin-panel-books.service';
import { UpdateBookDTO } from './dto/update.book.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('admin-panel/books')
@ApiTags('Admin Panel - Books')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AdminPanelBooksController {
  constructor(
    private readonly adminPanelBooksService: AdminPanelBooksService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new book' })
  @ApiBody({ type: CreateBookDTO })
  @ApiResponse({
    status: 201,
    description: 'Book has been successfully added.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'Book with this id or slug already exists.' })
  async addBook(@Body() data: CreateBookDTO) {
    return this.adminPanelBooksService.createBook(data);
  }

  @Post('fill')
  @ApiOperation({ summary: 'Add multiple books' })
  @ApiBody({ type: [CreateBookDTO] })
  @ApiResponse({ status: 201, description: 'Books have been successfully added.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async addManyBooks(@Body() data: CreateBookDTO[]) {
    return this.adminPanelBooksService.createManyBooks(data);
  }

  @Post('fill-template')
  @ApiOperation({ summary: 'Fill books from a predefined template' })
  @ApiResponse({ status: 201, description: 'Template has been successfully filled with books.' })
  @ApiResponse({ status: 502, description: 'Cannot fetch template data.' })
  async fillTemplate() {
    return this.adminPanelBooksService.fillTemplate();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by UUID' })
  @ApiParam({ name: 'id', description: 'UUID of the book to be deleted' })
  @ApiResponse({ status: 200, description: 'Book has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete book.' })
  async deleteBook(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminPanelBooksService.deleteBook(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update an existing book' })
  @ApiBody({ type: UpdateBookDTO })
  @ApiResponse({ status: 200, description: 'Book has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete book.' })
  async updateBook(@Body() data: UpdateBookDTO) {
    return this.adminPanelBooksService.updateBook(data);
  }
}
