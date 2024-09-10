import { Body, Controller, Post } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { AskAssistantDTO } from './dto/ask.question.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('assistant')
@ApiTags('AI Assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @ApiOperation({
    summary: 'Ask AI assistant a question about Harry Potter universe',
  })
  @ApiBody({
    description: 'Question',
    type: AskAssistantDTO,
  })
  @ApiResponse({ status: 201, description: 'Assistant response' })
  @ApiResponse({ status: 400, description: 'Cannot generate answer' })
  @Post()
  async askAssistant(@Body() question: AskAssistantDTO) {
    return this.assistantService.askAssistant(question.question);
  }
}
