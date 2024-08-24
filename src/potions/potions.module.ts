import { Module } from '@nestjs/common';
import { PotionsService } from './potions.service';
import { PotionsController } from './potions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PotionsController],
  providers: [PotionsService, PrismaService],
})
export class PotionsModule {}
