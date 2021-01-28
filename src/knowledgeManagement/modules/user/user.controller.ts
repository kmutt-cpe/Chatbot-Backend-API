import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserService } from './user.service';

@Controller('km/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<UserDto[]> {
    return (await this.userService.getAllUser()).map((user) => user.getData());
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return (await this.userService.getUserById(id)).getData();
  }

  @Patch()
  async updateUser(@Body('update') updateUserDto: UpdateUserDto): Promise<UserDto> {
    return (await this.userService.updateUser(updateUserDto)).getData();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return (await this.userService.createUser(createUserDto)).getData();
  }

  @Delete()
  async deleteUser(@Body('id') id: string): Promise<UserDto> {
    return (await this.userService.deleteUserById(id)).getData();
  }
}
