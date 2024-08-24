import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AdminPanelBooksService } from './books/admin-panel-books.service';
import { AdminPanelBooksController } from './books/admin-panel-books.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AdminPanelMoviesController } from './movies/admin-panel-movies.controller';
import { AdminPanelMoviesService } from './movies/admin-panel-movies.service';
import { AdminPanelPotionsController } from './potions/potions.controller';
import { AdminPanelPotionsService } from './potions/potions.service';

@Module({
  controllers: [
    AdminPanelBooksController,
    AuthController,
    AdminPanelMoviesController,
    AdminPanelPotionsController,
  ],
  providers: [
    PrismaService,
    AdminPanelBooksService,
    AuthService,
    AdminPanelMoviesService,
    AdminPanelPotionsService,
  ],
})
export class AdminPanelModule {}
