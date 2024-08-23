import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AdminPanelBooksService } from './books/admin-panel-books.service';
import { AdminPanelBooksController } from './books/admin-panel-books.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [AdminPanelBooksController, AuthController],
  providers: [PrismaService, AdminPanelBooksService, AuthService],
})
export class AdminPanelModule {}
