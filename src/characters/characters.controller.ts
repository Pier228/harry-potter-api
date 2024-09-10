import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { SearchLimitDTO } from 'src/books/dto/search.query.dto';
import { CharacterSearchParamsDTO } from './dto/character.search.params.dto';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@Controller('characters')
@ApiTags('Characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiOperation({ summary: 'Get all characters' })
  @ApiQuery({
    name: 'limit',
    description: 'Results limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Current page number',
    type: Number,
    required: false,
  })
  @ApiBody({
    description: 'Search parameters',
    type: CharacterSearchParamsDTO,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'List of characters' })
  @ApiResponse({ status: 404, description: 'Characters not found' })
  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: CharacterSearchParamsDTO,
  ) {
    return this.charactersService.findAll(limit, page, searchParams);
  }

  @ApiOperation({ summary: 'Get a character by its UUID' })
  @ApiParam({ name: 'id', description: 'The UUID of the character', type: String })
  @ApiResponse({ status: 200, description: 'Character details' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.charactersService.findOne(id);
  }
}
