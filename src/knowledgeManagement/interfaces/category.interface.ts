import { BaseInterface } from '@BaseObject';
import { Subcategory } from './subcategory.interface';

export interface Category extends BaseInterface {
  category: string;
  subcategories: Subcategory[];
}
