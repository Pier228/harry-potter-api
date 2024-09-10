import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminPanelCharactersService } from './characters.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateCharacterDTO } from './dto/create.character.dto';
import { UpdateCharacterDTO } from './dto/update.character.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin-panel/characters')
@ApiTags('Admin Panel - Characters')
@UseGuards(AuthGuard)
export class AdminPanelCharactersController {
  constructor(private readonly adminPanelCharactersService: AdminPanelCharactersService) {}
  
  @Post()
  async addCharacter(@Body() data: CreateCharacterDTO) {
    return this.adminPanelCharactersService.createCharacter(data);
  }

  @Post('fill')
  async addManyCharacters(@Body() data: CreateCharacterDTO[]) {
    return this.adminPanelCharactersService.createManyCharacters(data);
  }

  @Post('fill-template')
  async fillTemplate() {
    return this.adminPanelCharactersService.fillTemplate();
  }

  @Delete(':id')
  async deleteCharacter(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminPanelCharactersService.deleteCharacter(id);
  }

  @Patch()
  async updateCharacter(@Body() data: UpdateCharacterDTO) {
    return this.adminPanelCharactersService.updateCharacter(data);
  }
}
