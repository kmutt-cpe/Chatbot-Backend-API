/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CookieClear } from './helper/cookie.clear';

@Controller('km/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    CookieClear(res);
    return res.sendStatus(200);
  }

  @Get()
  async checkAuth(@Req() req: Request, @Res() res: Response): Promise<AuthDto> {
    const authorization = req.cookies['authorization'] || '';
    const user = req.cookies['user'] || '';
    const retAuth = await this.authService.checkAuth({ authorization, ...user });
    if (retAuth.authorization !== '') return retAuth;
    else {
      CookieClear(res);
      return retAuth;
    }
  }
}
