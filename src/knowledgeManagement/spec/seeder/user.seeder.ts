import { BaseSeeder } from '@BaseObject';
import { User as UserInterface } from '../../modules/user/user.interface';
import { UserRole } from '../../modules/user/domain/userRole.constant';

export class UserSeeder extends BaseSeeder<UserInterface> {
  getData(): UserInterface[] {
    const users: UserInterface[] = [
      {
        id: 'User-0',
        username: 'username1',
        password: 'password1',
        name: 'name1',
        role: UserRole.ADMIN,
      },
      {
        id: 'User-1',
        username: 'username2',
        password: 'password2',
        name: 'name2',
        role: UserRole.ADMIN,
      },
    ];
    return users;
  }
}
