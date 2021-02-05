import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserService } from './user.service';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserDto])
  async getAllUser(): Promise<UserDto[]> {
    return await this.userService.getAllUser();
  }

  @Query(() => UserDto)
  async getUserById(@Args('id', { type: () => ID }) id: string): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => UserDto)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.createUser(createUserDto);
  }

  @Mutation(() => UserDto)
  async updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.updateUser(updateUserDto);
  }

  @Mutation(() => UserDto)
  async register(@Args('updateUserDto') createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.register(createUserDto);
  }

  @Mutation(() => UserDto)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<UserDto> {
    return await this.userService.deleteUserById(id);
  }
}
