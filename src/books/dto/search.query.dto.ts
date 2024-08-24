import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { SEARCH_RESULT_LIMIT } from 'src/consts';

export class SearchLimitDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(SEARCH_RESULT_LIMIT)
  @Min(1)
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;
}
