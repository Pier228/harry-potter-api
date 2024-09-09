import { Body, Controller, Post } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { AskAssistantDTO } from './dto/ask.question.dto';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post()
  async askAssistant(@Body() question: AskAssistantDTO) {
    return this.assistantService.askAssistant(question.question);
  }
}
