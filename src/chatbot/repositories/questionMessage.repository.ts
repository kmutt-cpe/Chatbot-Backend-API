import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';
import { QuestionMessage } from '../entities/questionMessage.entity';

@EntityRepository(QuestionMessage)
export class QuestionMessageRepository extends BaseRepository<QuestionMessage> {}
