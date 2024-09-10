import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminPanelSpellsService } from './spells.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateSpellDTO } from './dto/create.spell.dto';
import { UpdateSpellDTO } from './dto/update.spell.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('admin-panel/spells')
@ApiTags('Admin Panel - Spells')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AdminPanelSpellsController {
  constructor(
    private readonly adminPanelSpellsService: AdminPanelSpellsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new spell' })
  @ApiBody({ type: CreateSpellDTO })
  @ApiResponse({
    status: 201,
    description: 'Spell has been successfully added.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'Spell with this id or slug already exists.' })
  async addSpell(@Body() data: CreateSpellDTO) {
    return this.adminPanelSpellsService.createSpell(data);
  }

  @Post('fill')
  @ApiOperation({ summary: 'Add multiple spells' })
  @ApiBody({ type: [CreateSpellDTO] })
  @ApiResponse({ status: 201, description: 'Spells have been successfully added.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async addManySpells(@Body() data: CreateSpellDTO[]) {
    return this.adminPanelSpellsService.createManySpells(data);
  }

  @Post('fill-template')
  @ApiOperation({ summary: 'Fill spells from a predefined template' })
  @ApiResponse({ status: 201, description: 'Template has been successfully filled with spells.' })
  @ApiResponse({ status: 502, description: 'Cannot fetch template data.' })
  async fillTemplate() {
    return this.adminPanelSpellsService.fillTemplate();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a spell by UUID' })
  @ApiParam({ name: 'id', description: 'UUID of the spell to be deleted' })
  @ApiResponse({ status: 200, description: 'Spell has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Spell not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete spell.' })
  async deleteSpell(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminPanelSpellsService.deleteSpell(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update an existing spell' })
  @ApiBody({ type: UpdateSpellDTO })
  @ApiResponse({ status: 200, description: 'Spell has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Spell not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete spell.' })
  async updateSpell(@Body() data: UpdateSpellDTO) {
    return this.adminPanelSpellsService.updateSpell(data);
  }
}
