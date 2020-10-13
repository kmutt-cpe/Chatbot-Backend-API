import { FAQ } from '../domain/entities/faq.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';

@EntityRepository(FAQ)
export class FAQRepository extends BaseRepository<FAQ> {}
