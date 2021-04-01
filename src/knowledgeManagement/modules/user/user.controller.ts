/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserService } from './user.service';

@Controller('km/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(): Promise<UserDto[]> {
    return await this.userService.getAllUser();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body('update') updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.updateUser(updateUserDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.createUser(createUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body('id') id: string): Promise<UserDto> {
    return await this.userService.deleteUserById(id);
  }

  @Post('/login')
  async login(@Body() LoginDto: LoginDto, @Res() res: Response) {
    const payload = await this.authService.login(LoginDto);
    res.cookie('authorization', payload.authorization);
    res.cookie('user', {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    });
    return res.send({ ...payload });
  }

  @Post('/logout')
  async logout(@Res() res: Response): Promise<Response> {
    res.clearCookie('authorization');
    res.clearCookie('user');
    return res.sendStatus(200);
  }
}
