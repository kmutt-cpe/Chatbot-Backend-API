import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/domain/user.entity';
import { UserRepository } from '../user/domain/user.repository';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userRepo: UserRepository) {}

  async login(loginDto: LoginDto): Promise<AuthDto> {
    const { username, password } = loginDto;

    const user: User = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new HttpException('Incorrect username or password', HttpStatus.BAD_REQUEST);
    const isCorrect = await user.comparePassword(password);

    if (isCorrect) {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        authorization: this.jwtService.sign(user.getData()),
      };
    } else throw new HttpException('Incorrect username or password', HttpStatus.BAD_REQUEST);
  }

  async checkAuth(authDto: AuthDto): Promise<AuthDto> {
    const { id = '', authorization: token = 'unauth' } = authDto;
    const user: User = await this.userRepo.findById(id);

    try {
      if (!user || !this.jwtService.verify(token)) throw Error();
    } catch (e) {
      return {
        id: '',
        username: '',
        role: '',
        authorization: '',
      };
    }

    return {
      ...authDto,
    };
  }
}
