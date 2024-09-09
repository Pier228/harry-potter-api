import { Module } from '@nestjs/common';
import { SpellsService } from './spells.service';
import { SpellsController } from './spells.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SpellsController],
  providers: [SpellsService, PrismaService],
})
export class SpellsModule {}
