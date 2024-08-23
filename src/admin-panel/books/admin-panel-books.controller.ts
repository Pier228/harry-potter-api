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

@Controller('admin-panel/books')
@UseGuards(AuthGuard)
export class AdminPanelBooksController {
  constructor(
    private readonly adminPanelBooksService: AdminPanelBooksService,
  ) {}
  @Post()
  async addBook(@Body() data: CreateBookDTO) {
    return this.adminPanelBooksService.createBook(data);
  }

  @Post('fill')
  async addManyBooks(@Body() data: CreateBookDTO[]) {
    return this.adminPanelBooksService.createManyBooks(data);
  }

  @Post('fill-template')
  async fillTemplate() {
    return this.adminPanelBooksService.fillTemplate();
  }

  @Delete(':id')
  async deleteBook(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminPanelBooksService.deleteBook(id);
  }

  @Patch()
  async updateBook(@Body() data: UpdateBookDTO) {
    return this.adminPanelBooksService.updateBook(data);
  }
}
