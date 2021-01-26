import { MockBaseRepository } from '@BaseObject';
import { User } from '../../modules/user/domain/user.entity';
import { User as UserInterface } from '../../modules/user/user.interface';

export class MockUserRepository extends MockBaseRepository<User> {
  constructor() {
    super(User);
  }

  setup(data: UserInterface[]): void {
    this.mockData(data);
  }
}
