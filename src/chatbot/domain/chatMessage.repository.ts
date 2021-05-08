import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';
import { ChatMessage } from 'chatbot/domain/chatMessage.entity';

@EntityRepository(ChatMessage)
export class ChatMessageRepository extends BaseRepository<ChatMessage> {}
