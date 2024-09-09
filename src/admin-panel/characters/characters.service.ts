import {
  BadGatewayException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCharacterDTO } from './dto/create.character.dto';
import { UpdateCharacterDTO } from './dto/update.character.dto';
import { Character } from '@prisma/client';

@Injectable()
export class AdminPanelCharactersService {
  constructor(private readonly prisma: PrismaService) {}

  async createCharacter(data: CreateCharacterDTO) {
    try {
      const character = await this.isExist(data.id, data.slug);

      if (character) {
        throw new ConflictException(
          'Character with this id or slug already exists',
        );
      }

      const response = await this.prisma.character.create({ data });

      if (!response) {
        throw new BadGatewayException('Cannot create character');
      }

      return { message: 'Character created successfully' };
    } catch (error) {
      throw error;
    }
  }

  async createManyCharacters(data: CreateCharacterDTO[]) {
    try {
      const response = await this.prisma.character.createMany({
        data,
        skipDuplicates: true,
      });

      if (!response) {
        throw new BadGatewayException('Cannot create character');
      }

      return { message: 'Characters created successfully', response };
    } catch (error) {
      throw error;
    }
  }

  async fillTemplate() {
    try {
      const data = [];

      for (let page = 1; page; page++) {
        const templateData = await fetch(
          `https://api.potterdb.com/v1/characters?page[number]=${page}`,
        );

        if (!templateData) {
          throw new BadGatewayException('Cannot fetch template data');
        }

        const templateJson = await templateData.json();

        if (templateJson.data.length < 1) break;

        const filteredData = templateJson.data.map((el) => {
          delete el.attributes.alias_names;
          return { id: el.id, ...el.attributes };
        });

        data.push(...filteredData);
      }

      const response = await this.prisma.character.createMany({
        data,
        skipDuplicates: true,
      });

      if (!response) {
        throw new BadGatewayException('Cannot create characters');
      }

      return { message: 'Template filled successfully', response };
    } catch (error) {
      throw error;
    }
  }

  async deleteCharacter(id: string) {
    try {
      const isExist = await this.isExist(id);

      if (!isExist) {
        throw new NotFoundException(`Character with id - ${id} not found`);
      }

      const response = await this.prisma.character.delete({ where: { id } });

      if (!response) {
        throw new BadGatewayException('Cannot delete character');
      }

      return { message: 'Character deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async updateCharacter(data: UpdateCharacterDTO) {
    try {
      const isExist = await this.isExist(data.id);

      if (!isExist) {
        throw new NotFoundException(`Character with id - ${data.id} not found`);
      }

      const response = await this.prisma.character.update({
        where: { id: data.id },
        data: data,
      });

      if (!response) {
        throw new BadGatewayException('Cannot update character');
      }

      return { message: 'Character updated successfully', response };
    } catch (error) {
      throw error;
    }
  }

  private async isExist(id: string, slug?: string) {
    try {
      let character: Character | null;
      character = await this.prisma.character.findUnique({ where: { id } });

      if (!character && slug) {
        character = await this.prisma.character.findUnique({ where: { slug } });
      }

      return character;
    } catch (error) {
      throw error;
    }
  }
}
