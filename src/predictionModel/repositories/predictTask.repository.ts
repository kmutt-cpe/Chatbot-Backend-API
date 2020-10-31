import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';
import { PredictTask } from '../entities/predictTask.entity';

@EntityRepository(PredictTask)
export class PredictTaskRepository extends BaseRepository<PredictTask> {}
