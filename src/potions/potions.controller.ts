import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PotionsService } from './potions.service';
import { SearchLimitDTO } from 'src/books/dto/search.query.dto';
import { PotionSearchParamsDTO } from './dto/potion.search.params.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@Controller('potions')
@ApiTags('Potions')
export class PotionsController {
  constructor(private readonly potionsService: PotionsService) {}

  @ApiOperation({ summary: 'Get all potions' })
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
    type: PotionSearchParamsDTO,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'List of potions' })
  @ApiResponse({ status: 404, description: 'Potions not found' })
  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: PotionSearchParamsDTO,
  ) {
    return this.potionsService.findAll(limit, page, searchParams);
  }

  @ApiOperation({ summary: 'Get a potion by its UUID' })
  @ApiParam({ name: 'id', description: 'The UUID of the potion', type: String })
  @ApiResponse({ status: 200, description: 'Potion details' })
  @ApiResponse({ status: 404, description: 'Potion not found' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.potionsService.findOne(id);
  }
}
