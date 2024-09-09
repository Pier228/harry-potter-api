import { Injectable, NotFoundException } from '@nestjs/common';
import { SEARCH_RESULT_LIMIT } from 'src/consts';
import { PrismaService } from 'src/prisma.service';
import { CharacterSearchParamsDTO } from './dto/character.search.params.dto';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    limit: number = SEARCH_RESULT_LIMIT,
    page: number = 1,
    searchParams?: CharacterSearchParamsDTO,
  ) {
    try {
      const whereConditions = this.findConditions(searchParams);
      const skip = (page - 1) * limit;

      const data = await this.prisma.character.findMany({
        take: limit,
        where: whereConditions,
        skip,
      });

      if (data.length < 1) {
        throw new NotFoundException('Characters not found');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const character = await this.prisma.character.findUnique({
        where: { id },
      });

      if (!character) {
        throw new NotFoundException(`Character with id - ${id} not found`);
      }

      return character;
    } catch (error) {
      throw error;
    }
  }

  private findConditions(searchParams: CharacterSearchParamsDTO) {
    const whereConditions: any = {};

    if (searchParams) {
      if (searchParams.id) whereConditions.id = searchParams.id;
      if (searchParams.slug)
        whereConditions.slug = {
          contains: searchParams.slug,
          mode: 'insensitive',
        };
      if (searchParams.animagus)
        whereConditions.animagus = {
          contains: searchParams.animagus,
          mode: 'insensitive',
        };
      if (searchParams.blood_status)
        whereConditions.blood_status = {
          contains: searchParams.blood_status,
          mode: 'insensitive',
        };
      if (searchParams.boggart)
        whereConditions.boggart = {
          contains: searchParams.boggart,
          mode: 'insensitive',
        };
      if (searchParams.born)
        whereConditions.born = {
          contains: searchParams.born,
          mode: 'insensitive',
        };
      if (searchParams.died)
        whereConditions.died = {
          contains: searchParams.died,
          mode: 'insensitive',
        };
      if (searchParams.eye_color)
        whereConditions.eye_color = {
          contains: searchParams.eye_color,
          mode: 'insensitive',
        };
      if (searchParams.name)
        whereConditions.name = {
          contains: searchParams.name,
          mode: 'insensitive',
        };
      if (searchParams.gender)
        whereConditions.gender = {
          contains: searchParams.gender,
          mode: 'insensitive',
        };
      if (searchParams.hair_color)
        whereConditions.hair_color = {
          contains: searchParams.hair_color,
          mode: 'insensitive',
        };
      if (searchParams.height)
        whereConditions.height = {
          contains: searchParams.height,
          mode: 'insensitive',
        };
      if (searchParams.house)
        whereConditions.house = {
          contains: searchParams.house,
          mode: 'insensitive',
        };
      if (searchParams.marital_status)
        whereConditions.marital_status = {
          contains: searchParams.marital_status,
          mode: 'insensitive',
        };
      if (searchParams.nationality)
        whereConditions.nationality = {
          contains: searchParams.nationality,
          mode: 'insensitive',
        };
      if (searchParams.patronus)
        whereConditions.patronus = {
          contains: searchParams.patronus,
          mode: 'insensitive',
        };
      if (searchParams.skin_color)
        whereConditions.skin_color = {
          contains: searchParams.skin_color,
          mode: 'insensitive',
        };
      if (searchParams.species)
        whereConditions.species = {
          contains: searchParams.species,
          mode: 'insensitive',
        };
      if (searchParams.weight)
        whereConditions.weight = {
          contains: searchParams.weight,
          mode: 'insensitive',
        };
    }

    return whereConditions;
  }
}
