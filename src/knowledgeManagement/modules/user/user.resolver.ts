import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ID, Args, Mutation, Context } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserService } from './user.service';
import { AuthDto } from '../auth/dto/auth.dto';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Query(() => [UserDto])
  @UseGuards(GqlAuthGuard)
  async getAllUser(): Promise<UserDto[]> {
    return await this.userService.getAllUser();
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async getUserById(@Args('id', { type: () => ID }) id: string): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.createUser(createUserDto);
  }

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.updateUser(updateUserDto);
  }

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async register(@Args('updateUserDto') createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.register(createUserDto);
  }

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<UserDto> {
    return await this.userService.deleteUserById(id);
  }

  @Query(() => AuthDto)
  async login(@Args('loginDto') loginDto: LoginDto, @Context() context): Promise<AuthDto> {
    const payload = await this.authService.login(loginDto);
    context.res.cookie('authorization', payload.authorization);
    context.res.cookie('user', {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    });
    return payload;
  }

  @Query(() => AuthDto)
  async logout(@Context() context): Promise<AuthDto> {
    context.res.clearCookie('user');
    context.res.clearCookie('authorization');
    return {
      id: 'id',
      username: 'username',
      role: 'role',
      authorization: 'auth',
    };
  }
}
