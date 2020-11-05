import { FAQ as FAQInterface } from '../interfaces/faq.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';

@Entity()
export class FAQ extends BaseEntity implements FAQInterface {
  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  lastEditor: string;
}
