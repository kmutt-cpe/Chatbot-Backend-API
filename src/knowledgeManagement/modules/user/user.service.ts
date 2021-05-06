import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './domain/user.entity';
import { UserRepository } from './domain/user.repository';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getAllUser(): Promise<UserDto[]> {
    return await (await this.userRepo.findAll()).map((user) => user.getData());
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userRepo.findById(id);
    if (!user) return null;
    return user.getData();
  }

  async deleteUserById(id: string): Promise<UserDto | null> {
    let user: User = await this.userRepo.findById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    user = await this.userRepo.softRemove(user);
    if (!user) throw new HttpException('Cannot delete user', HttpStatus.NOT_IMPLEMENTED);
    return user ? user.getData() : null;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserDto> {
    let user = await this.userRepo.findById(updateUserDto.id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const { name, role } = updateUserDto;
    user.setDataValue('name', name);
    user.setDataValue('role', role);
    user = await this.userRepo.save(user);
    if (!user) throw new HttpException('Cannot update user', HttpStatus.NOT_IMPLEMENTED);
    return user.getData();
  }

  async setPassword(updateUserDto: UpdateUserDto, operator?: UserDto): Promise<UserDto> {
    // todo: Check operator that can set password or not
    let user = await this.userRepo.findById(updateUserDto.id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const { password } = updateUserDto;
    user.setDataValue('password', await bcrypt.hash(password, 10));

    user = await this.userRepo.save(user);
    if (!user) throw new HttpException('Cannot update user', HttpStatus.NOT_IMPLEMENTED);
    return user.getData();
  }

  async changePassword(oldPassword: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    let user = await this.userRepo.findById(updateUserDto.id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const { password } = updateUserDto;
    if (!(await user.comparePassword(oldPassword)))
      if (!user) throw new HttpException('Old password is not correct', HttpStatus.BAD_REQUEST);
    user.setDataValue('password', await bcrypt.hash(password, 10));
    user = await this.userRepo.save(user);
    if (!user) throw new HttpException('Cannot update password', HttpStatus.NOT_IMPLEMENTED);
    return user.getData();
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, password, name, role } = createUserDto;
    let user = await this.userRepo.findOne({ where: { username } });
    if (user) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    user = await this.userRepo.create(user);
    user.setDataValue('username', username);
    user.setDataValue('password', await bcrypt.hash(password, 10));
    user.setDataValue('name', name);
    user.setDataValue('role', role);
    user = await this.userRepo.save(user);
    if (!user) throw new HttpException('Cannot create user', HttpStatus.NOT_IMPLEMENTED);
    return user.getData();
  }
}
