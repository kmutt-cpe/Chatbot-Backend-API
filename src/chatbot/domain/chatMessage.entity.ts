import { BaseEntity } from '@BaseObject';
import { ChatMessageDto } from 'chatbot/dto/chatMessage.dto';
import { Entity, Column } from 'typeorm';

@Entity()
export class ChatMessage extends BaseEntity {
  @Column()
  responseId: string;

  @Column({ type: 'json' })
  queryResult: string;

  @Column({ type: 'json' })
  originalDetectIntentRequest: string;

  @Column()
  session: string;

  getData(): ChatMessageDto {
    const { id, session, responseId } = this;
    const queryResult = JSON.parse(this.queryResult);
    const originalDetectIntentRequest = JSON.parse(this.originalDetectIntentRequest);
    return { id, session, responseId, queryResult, originalDetectIntentRequest };
  }
}
