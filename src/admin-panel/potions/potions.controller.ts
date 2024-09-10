import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminPanelPotionsService } from './potions.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreatePotionDTO } from './dto/create.potion.dto';
import { UpdatePotionDTO } from './dto/update.potion.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('admin-panel/potions')
@ApiTags('Admin Panel - Potions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AdminPanelPotionsController {
  constructor(
    private readonly adminPanelPotionsService: AdminPanelPotionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new potion' })
  @ApiBody({ type: CreatePotionDTO })
  @ApiResponse({
    status: 201,
    description: 'Potion has been successfully added.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'Potion with this id or slug already exists.' })
  async addPotion(@Body() data: CreatePotionDTO) {
    return this.adminPanelPotionsService.createPotion(data);
  }

  @Post('fill')
  @ApiOperation({ summary: 'Add multiple potions' })
  @ApiBody({ type: [CreatePotionDTO] })
  @ApiResponse({ status: 201, description: 'Potions have been successfully added.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async addManyPotions(@Body() data: CreatePotionDTO[]) {
    return this.adminPanelPotionsService.createManyPotions(data);
  }

  @Post('fill-template')
  @ApiOperation({ summary: 'Fill potions from a predefined template' })
  @ApiResponse({ status: 201, description: 'Template has been successfully filled with potions.' })
  @ApiResponse({ status: 502, description: 'Cannot fetch template data.' })
  async fillTemplate() {
    return this.adminPanelPotionsService.fillTemplate();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a potion by UUID' })
  @ApiParam({ name: 'id', description: 'UUID of the potion to be deleted' })
  @ApiResponse({ status: 200, description: 'Potion has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Potion not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete potion.' })
  async deletePotion(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminPanelPotionsService.deletePotion(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update an existing potion' })
  @ApiBody({ type: UpdatePotionDTO })
  @ApiResponse({ status: 200, description: 'Potion has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Potion not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete potion.' })
  async updatePotion(@Body() data: UpdatePotionDTO) {
    return this.adminPanelPotionsService.updatePotion(data);
  }
}
