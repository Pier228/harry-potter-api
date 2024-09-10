import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminPanelCharactersService } from './characters.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateCharacterDTO } from './dto/create.character.dto';
import { UpdateCharacterDTO } from './dto/update.character.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('admin-panel/characters')
@ApiTags('Admin Panel - Characters')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AdminPanelCharactersController {
  constructor(private readonly adminPanelCharactersService: AdminPanelCharactersService) {}
  
  @Post()
  @ApiOperation({ summary: 'Add a new character' })
  @ApiBody({ type: CreateCharacterDTO })
  @ApiResponse({
    status: 201,
    description: 'Character has been successfully added.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'Character with this id or slug already exists.' })
  async addCharacter(@Body() data: CreateCharacterDTO) {
    return this.adminPanelCharactersService.createCharacter(data);
  }

  @Post('fill')
  @ApiOperation({ summary: 'Add multiple characters' })
  @ApiBody({ type: [CreateCharacterDTO] })
  @ApiResponse({ status: 201, description: 'Characters have been successfully added.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async addManyCharacters(@Body() data: CreateCharacterDTO[]) {
    return this.adminPanelCharactersService.createManyCharacters(data);
  }

  @Post('fill-template')
  @ApiOperation({ summary: 'Fill characters from a predefined template' })
  @ApiResponse({ status: 201, description: 'Template has been successfully filled with characters.' })
  @ApiResponse({ status: 502, description: 'Cannot fetch template data.' })
  async fillTemplate() {
    return this.adminPanelCharactersService.fillTemplate();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a character by UUID' })
  @ApiParam({ name: 'id', description: 'UUID of the character to be deleted' })
  @ApiResponse({ status: 200, description: 'Character has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Character not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete character.' })
  async deleteCharacter(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminPanelCharactersService.deleteCharacter(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update an existing character' })
  @ApiBody({ type: UpdateCharacterDTO })
  @ApiResponse({ status: 200, description: 'Character has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Character not found.' })
  @ApiResponse({ status: 502, description: 'Cannot delete character.' })
  async updateCharacter(@Body() data: UpdateCharacterDTO) {
    return this.adminPanelCharactersService.updateCharacter(data);
  }
}
