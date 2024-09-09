import { Body, Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { SpellsService } from './spells.service';
import { SearchLimitDTO } from 'src/books/dto/search.query.dto';
import { SpellSearchParamsDTO } from './dto/spell.search.params.dto';

@Controller('spells')
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: SpellSearchParamsDTO,
  ) {
    return this.spellsService.findAll(limit, page, searchParams);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.spellsService.findOne(id);
  }
}
