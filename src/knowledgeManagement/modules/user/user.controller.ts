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
    return await this.userService.getAllUser();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @Patch()
  async updateUser(@Body('update') updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.updateUser(updateUserDto);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.createUser(createUserDto);
  }

  @Delete()
  async deleteUser(@Body('id') id: string): Promise<UserDto> {
    return await this.userService.deleteUserById(id);
  }
}
