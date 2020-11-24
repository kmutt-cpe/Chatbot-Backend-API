import { Category as CategoryInterface } from '../interfaces/category.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column, OneToMany } from 'typeorm';
import { Subcategory } from './subcategory.entity';
import { CategoryDto } from 'knowledgeManagement/dto/category.dto';

@Entity()
export class Category extends BaseEntity implements CategoryInterface {
  @Column()
  category: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[] = [];

  getData(): CategoryDto {
    return { id: this.id, category: this.category, subcategories: this.subcategories };
  }
}
