import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserService } from './user.service';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserDto])
  @UseGuards(GqlAuthGuard)
  async getAllUser(): Promise<UserDto[]> {
    return await this.userService.getAllUser();
  }

  @Query(() => UserDto, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUserById(@Args('id', { type: () => ID }) id: string): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async createUser(@Args('user') createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.createUser(createUserDto);
  }

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('user') updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.updateUser(updateUserDto);
  }

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<UserDto> {
    return await this.userService.deleteUserById(id);
  }
}
