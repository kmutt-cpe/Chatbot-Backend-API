import { FBMessage as ChatMessageInterface } from '../interfaces/fbMessage.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';
import { FBMessageDto as ChatMessageDto } from 'chatbot/dto/fbMessage.dto';

@Entity()
export class ChatMessage extends BaseEntity implements ChatMessageInterface {
  @Column()
  message: string;

  getData(): ChatMessageDto {
    return { id: this.id, message: this.message };
  }
}
