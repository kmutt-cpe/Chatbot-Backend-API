import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from './domain/user.repository';
import { MockUserRepository } from '../../spec/mockRepository/mockUserRepository.mock';
import { UserSeeder } from '../../spec/seeder/user.seeder';
import { User as UserInterface } from './user.interface';
import { UserRole } from './domain/userRole.constant';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.update.dto';

describe('UserService', () => {
  let userService;

  beforeEach(async () => {
    const userSeeder: UserSeeder = new UserSeeder();
    const userData: UserInterface[] = userSeeder.getData();
    const mockUserRepository: MockUserRepository = new MockUserRepository();
    mockUserRepository.setup(userData);

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getCustomRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
      ],
    }).compile();
    userService = await moduleRef.resolve(UserService);
  });

  describe('getAllUser', () => {
    it('it should return all user', async () => {
      const expectedData: UserDto[] = [
        {
          id: 'User-0',
          username: 'username1',
          password: undefined,
          name: 'name1',
          role: UserRole.ADMIN,
        },
        {
          id: 'User-1',
          username: 'username2',
          password: undefined,
          name: 'name2',
          role: UserRole.ADMIN,
        },
      ];
      const users = await userService.getAllUser();
      return expect(users).toStrictEqual(expectedData);
    });
  });

  describe('getUserById', () => {
    it('it should return the correctly user', async () => {
      const expectedData: UserDto = {
        id: 'User-0',
        username: 'username1',
        password: undefined,
        name: 'name1',
        role: UserRole.ADMIN,
      };
      const user = await userService.getUserById('User-0');
      return expect(user).toStrictEqual(expectedData);
    });
  });

  describe('createUser', () => {
    let retData;
    const inputData: CreateUserDto = {
      id: undefined,
      username: 'username3',
      password: 'password3',
      name: 'name3',
      role: UserRole.ADMIN,
    };

    beforeEach(async () => {
      retData = await userService.createUser(inputData);
    });

    it('it should return new user', async () => {
      const expectedData: UserDto = {
        id: 'User-2',
        username: 'username3',
        password: undefined,
        name: 'name3',
        role: UserRole.ADMIN,
      };
      expect(retData).toStrictEqual(expectedData);
    });

    // todo: Add test for username exists in db
    it('it should add new user', async () => {
      const expectedData: UserDto[] = [
        {
          id: 'User-0',
          username: 'username1',
          password: undefined,
          name: 'name1',
          role: UserRole.ADMIN,
        },
        {
          id: 'User-1',
          username: 'username2',
          password: undefined,
          name: 'name2',
          role: UserRole.ADMIN,
        },
        {
          id: 'User-2',
          username: 'username3',
          password: undefined,
          name: 'name3',
          role: UserRole.ADMIN,
        },
      ];

      const users = await userService.getAllUser();
      expect(users.length).toStrictEqual(3);
      expect(users).toStrictEqual(expectedData);
    });
  });
  // todo: Add register test for username exists in db
  describe('updateUser', () => {
    let retData;
    const updatedData: UpdateUserDto = {
      id: 'User-1',
      username: undefined,
      name: 'name2update',
      password: 'password2update',
      role: UserRole.ADMIN,
    };

    beforeEach(async () => {
      retData = await userService.updateUser(updatedData);
    });

    it('it should return updated user', async () => {
      const expectedData: UserDto = {
        id: 'User-1',
        username: 'username2',
        name: 'name2update',
        password: undefined,
        role: UserRole.ADMIN,
      };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should update user', async () => {
      const expectedData: UserDto[] = [
        {
          id: 'User-0',
          username: 'username1',
          password: undefined,
          name: 'name1',
          role: UserRole.ADMIN,
        },
        {
          id: 'User-1',
          username: 'username2',
          name: 'name2update',
          password: undefined,
          role: UserRole.ADMIN,
        },
      ];

      const users = await userService.getAllUser();
      expect(users.length).toStrictEqual(2);
      expect(users).toStrictEqual(expectedData);
    });
  });

  describe('deleteUser', () => {
    let retData;
    const id = 'User-0';
    beforeEach(async () => {
      retData = await userService.deleteUserById(id);
    });

    it('it should return deleted user', async () => {
      const expectedData: UserDto = {
        id: 'User-0',
        username: 'username1',
        password: undefined,
        name: 'name1',
        role: UserRole.ADMIN,
      };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should delete user', async () => {
      const expectedData = [
        {
          id: 'User-1',
          username: 'username2',
          name: 'name2',
          password: undefined,
          role: UserRole.ADMIN,
        },
      ];
      const users = await userService.getAllUser();
      expect(users.length).toStrictEqual(1);
      expect(users).toStrictEqual(expectedData);
    });
  });
});
