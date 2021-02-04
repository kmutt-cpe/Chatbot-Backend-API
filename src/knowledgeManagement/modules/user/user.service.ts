import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './domain/user.entity';
import { UserRepository } from './domain/user.repository';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getAllUser(): Promise<UserDto[]> {
    return await (await this.userRepo.findAll()).map((user) => user.getData());
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userRepo.findById(id);
    // todo: Throw error 404 if not found user
    return user.getData();
  }

  async deleteUserById(id: string): Promise<UserDto | null> {
    let user: User = await this.userRepo.findOneOrFail(id);
    if (!user)
      // todo: Throw error 404 if not found user
      return null;
    user = await this.userRepo.softRemove(user);

    // todo: Remove user
    return user ? user.getData() : null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user: User = this.userRepo.create();
    // todo: Throw error 404 if not found user
    user.setDataValues(createUserDto);
    return (await this.userRepo.save(user)).getData();
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOneOrFail(updateUserDto.id);
    const { password, name, role } = updateUserDto;
    // todo: Throw error 404 if not found user
    user.setDataValue('password', password);
    user.setDataValue('name', name);
    user.setDataValue('role', role);
    return (await this.userRepo.save(user)).getData();
  }

  public async register(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username } = createUserDto;
    let user = await this.userRepo.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepo.create(user);
    return await (await this.userRepo.save(user)).getData();
  }
}
