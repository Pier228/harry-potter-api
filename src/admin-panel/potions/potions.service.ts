import {
  BadGatewayException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePotionDTO } from './dto/create.potion.dto';
import { UpdatePotionDTO } from './dto/update.potion.dto';
import { Potion } from '@prisma/client';

@Injectable()
export class AdminPanelPotionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPotion(data: CreatePotionDTO) {
    try {
      const potion = await this.isExist(data.id, data.slug);

      if (potion) {
        throw new ConflictException(
          'Potion with this id or slug already exists',
        );
      }

      const response = await this.prisma.potion.create({ data });

      if (!response) {
        throw new BadGatewayException('Cannot create potion');
      }

      return { message: 'Potion created successfully' };
    } catch (error) {
      throw error;
    }
  }

  async createManyPotions(data: CreatePotionDTO[]) {
    try {
      const response = await this.prisma.potion.createMany({
        data,
        skipDuplicates: true,
      });

      if (!response) {
        throw new BadGatewayException('Cannot create potion');
      }

      return { message: 'Potions created successfully', response };
    } catch (error) {
      throw error;
    }
  }

  async fillTemplate() {
    try {
      const data = [];

      for (let page = 1; page; page++) {
        const templateData = await fetch(`https://api.potterdb.com/v1/potions?page[number]=${page}`);

        if (!templateData) {
          throw new BadGatewayException('Cannot fetch template data');
        }

        const templateJson = await templateData.json();

        if (templateJson.data.length < 1) break;

        const filteredData = templateJson.data.map((el) => {
          return { id: el.id, ...el.attributes };
        });

        data.push(...filteredData);
      }

      const response = await this.prisma.potion.createMany({
        data,
        skipDuplicates: true,
      });

      if (!response) {
        throw new BadGatewayException('Cannot create potions');
      }

      return { message: 'Template filled successfully', response };
    } catch (error) {
      throw error;
    }
  }

  async deletePotion(id: string) {
    try {
      const isExist = await this.isExist(id);

      if (!isExist) {
        throw new NotFoundException(`Potion with id - ${id} not found`);
      }

      const response = await this.prisma.potion.delete({ where: { id } });

      if (!response) {
        throw new BadGatewayException('Cannot delete potion');
      }

      return { message: 'Potion deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async updatePotion(data: UpdatePotionDTO) {
    try {
      const isExist = await this.isExist(data.id);

      if (!isExist) {
        throw new NotFoundException(`Potion with id - ${data.id} not found`);
      }

      const response = await this.prisma.potion.update({
        where: { id: data.id },
        data: data,
      });

      if (!response) {
        throw new BadGatewayException('Cannot update potion');
      }

      return { message: 'Potion updated successfully', response };
    } catch (error) {
      throw error;
    }
  }

  private async isExist(id: string, slug?: string) {
    try {
      let potion: Potion | null;
      potion = await this.prisma.potion.findUnique({ where: { id } });

      if (!potion && slug) {
        potion = await this.prisma.potion.findUnique({ where: { slug } });
      }

      return potion;
    } catch (error) {
      throw error;
    }
  }
}
