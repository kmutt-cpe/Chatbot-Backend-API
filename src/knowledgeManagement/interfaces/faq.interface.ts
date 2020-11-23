import { User } from './user.interface';
import { BaseInterface } from '@BaseObject';
import { Subcategory } from './subcategory.interface';

export interface FAQ extends BaseInterface {
  question;
  answer;
  subcategory;
  lastEditor;
}
