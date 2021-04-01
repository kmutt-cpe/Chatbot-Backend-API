import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async login(
    loginDto: LoginDto
  ): Promise<{ id: string; username: string; role: string; authorization: string }> {
    const { username, password } = loginDto;
    const user: UserDto = await this.userService.login(username, password);
    //todo: Throw error when not found user
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      authorization: this.jwtService.sign(user),
    };
  }
}
