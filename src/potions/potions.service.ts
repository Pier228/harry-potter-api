import { Injectable, NotFoundException } from '@nestjs/common';
import { SEARCH_RESULT_LIMIT } from 'src/consts';
import { PrismaService } from 'src/prisma.service';
import { PotionSearchParamsDTO } from './dto/potion.search.params.dto';

@Injectable()
export class PotionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    limit: number = SEARCH_RESULT_LIMIT,
    page: number = 1,
    searchParams?: PotionSearchParamsDTO,
  ) {
    try {
      const whereConditions = this.findConditions(searchParams);
      const skip = (page - 1) * limit;

      const data = await this.prisma.potion.findMany({
        take: limit,
        where: whereConditions,
        skip,
      });

      if (data.length < 1) {
        throw new NotFoundException('Potions not found');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const potion = await this.prisma.potion.findUnique({
        where: { id },
      });

      if (!potion) {
        throw new NotFoundException(`Potion with id - ${id} not found`);
      }

      return potion;
    } catch (error) {
      throw error;
    }
  }

  private findConditions(searchParams: PotionSearchParamsDTO) {
    const whereConditions: any = {};

    if (searchParams) {
      if (searchParams.id) whereConditions.id = searchParams.id;
      if (searchParams.slug)
        whereConditions.slug = {
          contains: searchParams.slug,
          mode: 'insensitive',
        };
      if (searchParams.characteristics)
        whereConditions.characteristics = {
          contains: searchParams.characteristics,
          mode: 'insensitive',
        };
      if (searchParams.difficulty)
        whereConditions.difficulty = {
          contains: searchParams.difficulty,
          mode: 'insensitive',
        };
      if (searchParams.effect)
        whereConditions.effect = {
          contains: searchParams.effect,
          mode: 'insensitive',
        };
      if (searchParams.inventors)
        whereConditions.inventors = {
          contains: searchParams.inventors,
          mode: 'insensitive',
        };
      if (searchParams.ingredients)
        whereConditions.ingredients = {
          contains: searchParams.ingredients,
          mode: 'insensitive',
        };
      if (searchParams.manufacturers)
        whereConditions.manufacturers = {
          contains: searchParams.manufacturers,
          mode: 'insensitive',
        };
      if (searchParams.name)
        whereConditions.name = {
          contains: searchParams.name,
          mode: 'insensitive',
        };
      if (searchParams.side_effects)
        whereConditions.side_effects = {
          contains: searchParams.side_effects,
          mode: 'insensitive',
        };
      if (searchParams.time)
        whereConditions.time = {
          contains: searchParams.time,
          mode: 'insensitive',
        };
    }

    return whereConditions;
  }
}
