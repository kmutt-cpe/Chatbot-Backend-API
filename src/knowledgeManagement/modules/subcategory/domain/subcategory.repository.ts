import { Subcategory } from './subcategory.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';

@EntityRepository(Subcategory)
export class SubcategoryRepository extends BaseRepository<Subcategory> {}
