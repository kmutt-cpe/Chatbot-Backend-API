import { Category as CategoryInterface } from '../interfaces/category.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';

@Entity()
export class Category extends BaseEntity implements CategoryInterface {
  @Column()
  category: string;

  @Column()
  subcategory: string;
}
