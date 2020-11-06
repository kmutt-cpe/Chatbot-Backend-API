import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { QuestionMessageRepository } from './repositories/questionMessage.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionMessageRepository]),
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
