import { Subcategory as SubcategoryInterface } from '../interfaces/subcategory.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { FAQ } from './faq.entity';

@Entity()
export class Subcategory extends BaseEntity implements SubcategoryInterface {
  @Column()
  subcategory: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;

  @OneToMany(() => FAQ, (faq) => faq.subcategory)
  faqs: FAQ[];

  getData() {
    // todo: Implement return data
    return null;
  }
}
