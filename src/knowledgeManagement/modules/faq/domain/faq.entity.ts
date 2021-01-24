import { FAQ as FAQInterface } from '../faq.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/domain/user.entity';
import { Subcategory } from '../../subcategory/domain/subcategory.entity';
import { FAQDto } from 'knowledgeManagement/modules/faq/dto/faq.dto';

@Entity()
export class FAQ extends BaseEntity implements FAQInterface {
  @Column()
  question: string;

  @Column()
  answer: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.faqs)
  subcategory: Promise<Subcategory>;

  @ManyToOne(() => User, (user) => user.faqs)
  lastEditor: Promise<User>;

  async getData(): Promise<FAQDto> {
    const lastEditor = await this.lastEditor;
    const subcategory = await this.subcategory;
    const category = await subcategory.category;
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      subcategory: subcategory.getData(),
      category: category.getData(),
      lastEditor: lastEditor.getData(),
    };
  }
}
