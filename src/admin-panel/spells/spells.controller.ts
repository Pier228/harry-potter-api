import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminPanelSpellsService } from './spells.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateSpellDTO } from './dto/create.spell.dto';
import { UpdateSpellDTO } from './dto/update.spell.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin-panel/spells')
@ApiTags('Admin Panel - Spells')
@UseGuards(AuthGuard)
export class AdminPanelSpellsController {
  constructor(private readonly adminPanelSpellsService: AdminPanelSpellsService) {}

  @Post()
  async addSpell(@Body() data: CreateSpellDTO) {
    return this.adminPanelSpellsService.createSpell(data);
  }

  @Post('fill')
  async addManySpells(@Body() data: CreateSpellDTO[]) {
    return this.adminPanelSpellsService.createManySpells(data);
  }

  @Post('fill-template')
  async fillTemplate() {
    return this.adminPanelSpellsService.fillTemplate();
  }

  @Delete(':id')
  async deleteSpell(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminPanelSpellsService.deleteSpell(id);
  }

  @Patch()
  async updateSpell(@Body() data: UpdateSpellDTO) {
    return this.adminPanelSpellsService.updateSpell(data);
  }
}
