import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';
import { FBMessage } from 'chatbot/domain/fbMessage.entity';

@EntityRepository(FBMessage)
export class FBMessageRepository extends BaseRepository<FBMessage> {}
