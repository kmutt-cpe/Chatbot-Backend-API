import { FBMessage as ChatMessageInterface } from '../interfaces/fbMessage.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';
import { FBMessageDto as ChatMessageDto } from 'chatbot/dto/fbMessage.dto';

@Entity()
export class ChatMessage extends BaseEntity implements ChatMessageInterface {
  @Column()
  message: string;

  @Column()
  /** Id of message from dialogflow */
  responseId: string;

  @Column()
  /** Message from client */
  queryText: string;

  @Column({ type: 'json' })
  parameters: string;

  @Column()
  /** Path of agent, dialogflow: { intent:{ name : agent }} */
  agent: string;

  @Column()
  /** Name of agent, dialogflow: { intent:{ displayName : agent }} */
  agentName: string;

  @Column()
  /** Source of chat e.g. Line, Facebook */
  source: string;

  @Column()
  /** Use for reply msg back */
  replyToken: string;

  getData(): ChatMessageDto {
    return { id: this.id, message: this.message };
  }
}
