import { BadGatewayException, Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class AssistantService {
  private readonly groq = new Groq({ apiKey: process.env.AI_KEY });

  async askAssistant(question: string) {
    const chatCompletion = await this.groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: process.env.AI_SETTINGS,
        },
        {
          role: 'user',
          content: question,
        },
      ],
      model: process.env.AI_MODEL,
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    if (!chatCompletion) {
      throw new BadGatewayException('Cannot generate answer');
    }

    return { response: chatCompletion.choices[0].message.content };
  }
  catch(error) {
    throw error;
  }
}
