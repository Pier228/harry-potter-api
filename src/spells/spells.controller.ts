import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { SpellsService } from './spells.service';
import { SearchLimitDTO } from 'src/books/dto/search.query.dto';
import { SpellSearchParamsDTO } from './dto/spell.search.params.dto';
import {
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('spells')
@ApiTags('Spells')
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  @ApiOperation({ summary: 'Get all spells' })
  @ApiQuery({ name: 'limit', description: 'Results limit', type: Number, required: false })
  @ApiQuery({ name: 'page', description: 'Current page number', type: Number, required: false })
  @ApiBody({
    description: 'Search parameters',
    type: SpellSearchParamsDTO,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'List of spells' })
  @ApiResponse({ status: 404, description: 'Spells not found' })
  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: SpellSearchParamsDTO,
  ) {
    return this.spellsService.findAll(limit, page, searchParams);
  }

  @ApiOperation({ summary: 'Get a spell by its UUID' })
  @ApiParam({ name: 'id', description: 'The UUID of the spell', type: String })
  @ApiResponse({ status: 200, description: 'Spell details' })
  @ApiResponse({ status: 404, description: 'Spell not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.spellsService.findOne(id);
  }
}
