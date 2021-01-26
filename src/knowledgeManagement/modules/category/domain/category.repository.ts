import { Category } from './category.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';

@EntityRepository(Category)
export class CategoryRepository extends BaseRepository<Category> {}
