import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';
import { QuestionMessage as QuestionMessageInterface } from '../interfaces/questionMessage';

@Entity()
export class QuestionMessage extends BaseEntity implements QuestionMessageInterface {
  @Column()
  question: string;

  @Column("timestamp")
  public timestamp: Date;
}
