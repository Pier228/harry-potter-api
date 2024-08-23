import {
  BadGatewayException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDTO } from './dto/create.book.dto';
import { PrismaService } from 'src/prisma.service';
import { Book } from '@prisma/client';
import { UpdateBookDTO } from './dto/update.book.dto';

@Injectable()
export class AdminPanelBooksService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(data: CreateBookDTO) {
    try {
      const book = await this.isExist(data.id, data.slug);

      if (book) {
        throw new ConflictException('Book with this id or slug already exists');
      }

      const response = await this.prisma.book.create({ data });

      if (!response) {
        throw new BadGatewayException('Cannot create book');
      }

      return { message: 'Book created successfully' };
    } catch (error) {
      throw error;
    }
  }

  async createManyBooks(data: CreateBookDTO[]) {
    try {
      const response = await this.prisma.book.createMany({
        data,
        skipDuplicates: true,
      });

      if (!response) {
        throw new BadGatewayException('Cannot create book');
      }

      return { message: 'Books created successfully', response };
    } catch (error) {
      throw error;
    }
  }

  async fillTemplate() {
    try {
      const templateData = await fetch('https://api.potterdb.com/v1/books');

      if (!templateData) {
        throw new BadGatewayException('Cannot fetch template data');
      }

      const templateJson = await templateData.json();

      const data = templateJson.data.map((el) => {
        return { id: el.id, ...el.attributes };
      });

      const response = await this.prisma.book.createMany({
        data,
        skipDuplicates: true,
      });

      if (!response) {
        throw new BadGatewayException('Cannot create book');
      }

      return { message: 'Template filled successfully', response };
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(id: string) {
    try {
      const isExist = await this.isExist(id);

      if (!isExist) {
        throw new NotFoundException(`Book with id - ${id} not found`);
      }

      const response = await this.prisma.book.delete({ where: { id } });

      if (!response) {
        throw new BadGatewayException('Cannot delete book');
      }

      return { message: 'Book deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async updateBook(data: UpdateBookDTO) {
    try {
      const isExist = await this.isExist(data.id);

      if (!isExist) {
        throw new NotFoundException(`Book with id - ${data.id} not found`);
      }

      const response = await this.prisma.book.update({
        where: { id: data.id },
        data: data,
      });

      if (!response) {
        throw new BadGatewayException('Cannot update book');
      }

      return { message: 'Book updated successfully', response };
    } catch (error) {
      throw error;
    }
  }

  private async isExist(id: string, slug?: string) {
    try {
      let book: Book | null;
      book = await this.prisma.book.findUnique({ where: { id } });

      if (!book && slug) {
        book = await this.prisma.book.findUnique({ where: { slug } });
      }

      return book;
    } catch (error) {
      throw error;
    }
  }
}
