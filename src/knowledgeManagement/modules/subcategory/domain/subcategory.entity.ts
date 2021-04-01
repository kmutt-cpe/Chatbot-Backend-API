import { Subcategory as SubcategoryInterface } from '../subcategory.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../category/domain/category.entity';
import { FAQ } from '../../faq/domain/faq.entity';
import { SubcategoryDto } from 'knowledgeManagement/modules/subcategory/dto/subcategory.dto';

@Entity()
export class Subcategory extends BaseEntity implements SubcategoryInterface {
  @Column()
  subcategory: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Promise<Category>;

  @OneToMany(() => FAQ, (faq) => faq.subcategory)
  faqs: Promise<FAQ[]>;

  getData(): SubcategoryDto {
    return { id: this.id, subcategory: this.subcategory, category: undefined };
  }

  async getCategory(): Promise<Category> {
    return await this.category;
  }
}
