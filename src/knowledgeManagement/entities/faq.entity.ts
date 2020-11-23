import { FAQ as FAQInterface } from '../interfaces/faq.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Subcategory } from './subcategory.entity';

@Entity()
export class FAQ extends BaseEntity implements FAQInterface {
  @Column()
  question: string;

  @Column()
  answer: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.faqs)
  subcategory: Subcategory;

  @ManyToOne(() => User, (user) => user.faqs)
  lastEditor: User;
}
