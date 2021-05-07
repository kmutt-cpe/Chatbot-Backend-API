import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.resolver';
import { AuthService } from './auth.service';
import { expireTime, jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: expireTime },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthProvider],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
