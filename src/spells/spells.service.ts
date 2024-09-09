import { Injectable, NotFoundException } from '@nestjs/common';
import { SEARCH_RESULT_LIMIT } from 'src/consts';
import { PrismaService } from 'src/prisma.service';
import { SpellSearchParamsDTO } from './dto/spell.search.params.dto';


@Injectable()
export class SpellsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(
        limit: number = SEARCH_RESULT_LIMIT,
        page: number = 1,
        searchParams?: SpellSearchParamsDTO,
      ) {
        try {
          const whereConditions = this.findConditions(searchParams);
          const skip = (page - 1) * limit;
    
          const data = await this.prisma.spell.findMany({
            take: limit,
            where: whereConditions,
            skip,
          });
    
          if (data.length < 1) {
            throw new NotFoundException('Spells not found');
          }
    
          return data;
        } catch (error) {
          throw error;
        }
      }
    
      async findOne(id: string) {
        try {
          const spell = await this.prisma.spell.findUnique({
            where: { id },
          });
    
          if (!spell) {
            throw new NotFoundException(`Spell with id - ${id} not found`);
          }
    
          return spell;
        } catch (error) {
          throw error;
        }
      }

      private findConditions(searchParams: SpellSearchParamsDTO) {
        const whereConditions: any = {};
    
        if (searchParams) {
          if (searchParams.id) whereConditions.id = searchParams.id;
          if (searchParams.slug)
            whereConditions.slug = {
              contains: searchParams.slug,
              mode: 'insensitive',
            };
          if (searchParams.category)
            whereConditions.category = {
              contains: searchParams.category,
              mode: 'insensitive',
            };
          if (searchParams.creator)
            whereConditions.creator = {
              contains: searchParams.creator,
              mode: 'insensitive',
            };
          if (searchParams.effect)
            whereConditions.effect = {
              contains: searchParams.effect,
              mode: 'insensitive',
            };
          if (searchParams.hand)
            whereConditions.hand = {
              contains: searchParams.hand,
              mode: 'insensitive',
            };
          if (searchParams.incantation)
            whereConditions.incantation = {
              contains: searchParams.incantation,
              mode: 'insensitive',
            };
          if (searchParams.light)
            whereConditions.light = {
              contains: searchParams.light,
              mode: 'insensitive',
            };
          if (searchParams.name)
            whereConditions.name = {
              contains: searchParams.name,
              mode: 'insensitive',
            };
        }
    
        return whereConditions;
      }
}
