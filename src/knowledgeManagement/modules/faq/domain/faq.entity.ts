import { FAQ as FAQInterface } from '../faq.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/domain/user.entity';
import { Subcategory } from '../../subcategory/domain/subcategory.entity';
import { FAQDto } from 'knowledgeManagement/modules/faq/dto/faq.dto';

@Entity()
export class FAQ extends BaseEntity implements FAQInterface {
  @Column({ type: 'longtext' })
  question: string;

  @Column({ type: 'longtext' })
  answer: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.faqs)
  subcategory: Promise<Subcategory>;

  @ManyToOne(() => User, (user) => user.faqs, { onDelete: 'SET NULL', nullable: true })
  lastEditor: Promise<User>;

  @Column()
  updatedDate: Date;

  getData(): FAQDto {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      updatedDate: this.updatedDate,
      subcategory: undefined,
      category: undefined,
      lastEditor: undefined,
    };
  }

  async getSubcategory(): Promise<Subcategory> {
    return await this.subcategory;
  }

  async getLastEditor(): Promise<User> {
    return await this.lastEditor;
  }
}
