import { Controller, Get } from '@nestjs/common';
import { ChatbotModelService } from './chatbot.service';

@Controller()
export class ChatbotController {
  constructor(private readonly chatbotModelService: ChatbotModelService) {}

  @Get()
  getHello(): string {
    return this.chatbotModelService.getHello();
  }
}
