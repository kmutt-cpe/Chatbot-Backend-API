import { Category } from '../domain/entities/category.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';
import { ModelInput } from '../entities/modelInput.entity';

@EntityRepository(ModelInput)
export class ModelInputRepository extends BaseRepository<ModelInput> {}
