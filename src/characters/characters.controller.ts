import { Body, Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { SearchLimitDTO } from 'src/books/dto/search.query.dto';
import { CharacterSearchParamsDTO } from './dto/character.search.params.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: CharacterSearchParamsDTO,
  ) {
    return this.charactersService.findAll(limit, page, searchParams);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.charactersService.findOne(id);
  }
}
