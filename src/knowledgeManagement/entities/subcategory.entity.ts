import { Subcategory as SubcategoryInterface } from '../interfaces/subcategory.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';

@Entity()
export class Subcategory extends BaseEntity implements SubcategoryInterface {
  @Column()
  subcategory: string;
}
