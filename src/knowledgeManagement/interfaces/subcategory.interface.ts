import { BaseInterface } from '@BaseObject';
import { Category } from './category.interface';

export interface Subcategory extends BaseInterface {
  subcategory: string;
  category: Category;
}
