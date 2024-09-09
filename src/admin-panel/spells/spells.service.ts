import {
    BadGatewayException,
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma.service';
  import { Spell } from '@prisma/client';
import { CreateSpellDTO } from './dto/create.spell.dto';
import { UpdateSpellDTO } from './dto/update.spell.dto';
  
  @Injectable()
  export class AdminPanelSpellsService {
    constructor(private readonly prisma: PrismaService) {}
  
    async createSpell(data: CreateSpellDTO) {
      try {
        const spell = await this.isExist(data.id, data.slug);
  
        if (spell) {
          throw new ConflictException(
            'Spell with this id or slug already exists',
          );
        }
  
        const response = await this.prisma.spell.create({ data });
  
        if (!response) {
          throw new BadGatewayException('Cannot create spell');
        }
  
        return { message: 'Spell created successfully' };
      } catch (error) {
        throw error;
      }
    }
  
    async createManySpells(data: CreateSpellDTO[]) {
      try {
        const response = await this.prisma.spell.createMany({
          data,
          skipDuplicates: true,
        });
  
        if (!response) {
          throw new BadGatewayException('Cannot create spell');
        }
  
        return { message: 'Spells created successfully', response };
      } catch (error) {
        throw error;
      }
    }
  
    async fillTemplate() {
      try {
        const data = [];
  
        for (let page = 1; page; page++) {
          const templateData = await fetch(`https://api.potterdb.com/v1/spells?page[number]=${page}`);
  
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
  
        const response = await this.prisma.spell.createMany({
          data,
          skipDuplicates: true,
        });
  
        if (!response) {
          throw new BadGatewayException('Cannot create spells');
        }
  
        return { message: 'Template filled successfully', response };
      } catch (error) {
        throw error;
      }
    }
  
    async deleteSpell(id: string) {
      try {
        const isExist = await this.isExist(id);
  
        if (!isExist) {
          throw new NotFoundException(`Spell with id - ${id} not found`);
        }
  
        const response = await this.prisma.spell.delete({ where: { id } });
  
        if (!response) {
          throw new BadGatewayException('Cannot delete spell');
        }
  
        return { message: 'Spell deleted successfully' };
      } catch (error) {
        throw error;
      }
    }
  
    async updateSpell(data: UpdateSpellDTO) {
      try {
        const isExist = await this.isExist(data.id);
  
        if (!isExist) {
          throw new NotFoundException(`Spell with id - ${data.id} not found`);
        }
  
        const response = await this.prisma.spell.update({
          where: { id: data.id },
          data: data,
        });
  
        if (!response) {
          throw new BadGatewayException('Cannot update spell');
        }
  
        return { message: 'Spell updated successfully', response };
      } catch (error) {
        throw error;
      }
    }
  
    private async isExist(id: string, slug?: string) {
      try {
        let spell: Spell | null;
        spell = await this.prisma.spell.findUnique({ where: { id } });
  
        if (!spell && slug) {
          spell = await this.prisma.spell.findUnique({ where: { slug } });
        }
  
        return spell;
      } catch (error) {
        throw error;
      }
    }
  }
  