import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminPanelPotionsService } from './potions.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreatePotionDTO } from './dto/create.potion.dto';
import { UpdatePotionDTO } from './dto/update.potion.dto';

@Controller('admin-panel/potions')
@UseGuards(AuthGuard)
export class AdminPanelPotionsController {
  constructor(
    private readonly adminPanelPotionsService: AdminPanelPotionsService,
  ) {}

  @Post()
  async addPotion(@Body() data: CreatePotionDTO) {
    return this.adminPanelPotionsService.createPotion(data);
  }

  @Post('fill')
  async addManyPotions(@Body() data: CreatePotionDTO[]) {
    return this.adminPanelPotionsService.createManyPotions(data);
  }

  @Post('fill-template')
  async fillTemplate() {
    return this.adminPanelPotionsService.fillTemplate();
  }

  @Delete(':id')
  async deletePotion(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminPanelPotionsService.deletePotion(id);
  }

  @Patch()
  async updatePotion(@Body() data: UpdatePotionDTO) {
    return this.adminPanelPotionsService.updatePotion(data);
  }
}
