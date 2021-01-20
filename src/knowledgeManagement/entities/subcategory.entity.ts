import { Subcategory as SubcategoryInterface } from '../interfaces/subcategory.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { FAQ } from './faq.entity';
import { SubcategoryDto } from 'knowledgeManagement/dto/subcategory.dto';
import { CategoryDto } from 'knowledgeManagement/dto/category.dto';

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

  async getCategory(): Promise<CategoryDto> {
    return await (await this.category).getData();
  }
}
