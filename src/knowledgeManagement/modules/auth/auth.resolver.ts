import { Resolver, Query, Args, Context, GraphQLExecutionContext } from '@nestjs/graphql';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { CookieClear } from './helper/cookie.clear';

@Resolver(() => AuthDto)
export class AuthProvider {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Query(() => AuthDto)
  async login(@Args('login') loginDto: LoginDto, @Context() context): Promise<AuthDto> {
    const payload: AuthDto = await this.authService.login(loginDto);
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
    const res = context.res as Response;
    CookieClear(res);
    return {
      id: '',
      username: '',
      role: '',
      authorization: '',
    };
  }

  @Query(() => AuthDto)
  async checkAuth(@Context() context): Promise<AuthDto> {
    const req = context.req as Request;
    const res = context.res as Response;
    const authorization = req.cookies?.authorization;
    const user = req.cookies?.user;
    const retAuth = await this.authService.checkAuth({ authorization, ...user });
    if (retAuth.authorization !== '') return retAuth;
    else {
      CookieClear(res);
      return retAuth;
    }
  }
}
