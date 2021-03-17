import { FBMessage as FBMessageInterface } from '../interfaces/fbMessage.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';
import { FBMessageDto } from 'chatbot/dto/fbMessage.dto';

@Entity()
export class FBMessage extends BaseEntity implements FBMessageInterface {
  @Column()
  message: string;

  getData(): FBMessageDto {
    return { id: this.id, message: this.message };
  }
}
