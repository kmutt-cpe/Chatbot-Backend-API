import { Subcategory } from '../domain/entities/subcategory.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';

@EntityRepository(Subcategory)
export class SubcategoryRepository extends BaseRepository<Subcategory> {}
