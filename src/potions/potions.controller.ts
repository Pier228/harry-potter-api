import { Controller, Get, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { PotionsService } from './potions.service';
import { SearchLimitDTO } from 'src/books/dto/search.query.dto';
import { PotionSearchParamsDTO } from './dto/potion.search.params.dto';

@Controller('potions')
export class PotionsController {
  constructor(private readonly potionsService: PotionsService) {}

  @Get()
  async findAll(
    @Query() { limit, page }: SearchLimitDTO,
    @Body() searchParams: PotionSearchParamsDTO,
  ) {
    return this.potionsService.findAll(limit, page, searchParams);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.potionsService.findOne(id);
  }
}
