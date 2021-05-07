import { Injectable } from '@nestjs/common';
import { PredictionModelService } from 'predictionModel/predictionModel.service';
import { ChatMessage } from './domain/chatMessage.entity';
import { ChatMessageRepository } from './domain/chatMessage.repository';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly predictionModelService: PredictionModelService
  ) {}

  saveChatMessage(message: string): ChatMessage {
    const chatMessage: ChatMessage = this.chatMessageRepository.create();
    chatMessage.message = message ? message : '';
    this.chatMessageRepository.save(chatMessage);
    return chatMessage;
  }
}
