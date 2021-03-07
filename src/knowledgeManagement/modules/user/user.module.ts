import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './domain/user.repository';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), forwardRef(() => AuthModule)],
  providers: [UserService, UserResolver],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
