import { Injectable } from '@nestjs/common';
import { FBMessage } from './domain/fbMessage.entity';
import { FBMessageRepository } from './domain/fbMessage.repository';

@Injectable()
export class ChatbotService {
  constructor(private readonly fbMessageRepository: FBMessageRepository) {}

  saveFbMessage(message: string): FBMessage {
    const fbMessage: FBMessage = this.fbMessageRepository.create();
    fbMessage.message = message ? message : '';
    this.fbMessageRepository.save(fbMessage);
    return fbMessage;
  }
}
