import { FBMessage as ChatMessageInterface } from '../interfaces/fbMessage.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';
import { FBMessageDto as ChatMessageDto } from 'chatbot/dto/fbMessage.dto';

@Entity()
export class ChatMessage extends BaseEntity implements ChatMessageInterface {
  @Column({ collation: 'utf8_general_ci' })
  message: string;

  @Column({ collation: 'utf8_general_ci' })
  /** Id of message from dialogflow */
  responseId: string;

  @Column({ collation: 'utf8_general_ci' })
  /** Message from client */
  queryText: string;

  @Column({ type: 'json', collation: 'utf8_general_ci' })
  parameters: string;

  @Column({ collation: 'utf8_general_ci' })
  /** Path of agent, dialogflow: { intent:{ name : agent }} */
  agent: string;

  @Column({ collation: 'utf8_general_ci' })
  /** Name of agent, dialogflow: { intent:{ displayName : agent }} */
  agentName: string;

  @Column({ collation: 'utf8_general_ci' })
  /** Source of chat e.g. Line, Facebook */
  source: string;

  @Column({ collation: 'utf8_general_ci' })
  /** Use for reply msg back */
  replyToken: string;

  getData(): ChatMessageDto {
    return { id: this.id, message: this.message };
  }
}
