import { User } from './user.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@BaseObject';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
