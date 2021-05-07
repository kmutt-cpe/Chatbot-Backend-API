import { Injectable } from '@nestjs/common';
import { ChatMessage } from './domain/chatMessage.entity';
import { ChatMessageRepository } from './domain/chatMessage.repository';

@Injectable()
export class ChatbotService {
  constructor(private readonly fbMessageRepository: ChatMessageRepository) {}

  saveFbMessage(message: string): ChatMessage {
    const fbMessage: ChatMessage = this.fbMessageRepository.create();
    fbMessage.message = message ? message : '';
    this.fbMessageRepository.save(fbMessage);
    return fbMessage;
  }
}
