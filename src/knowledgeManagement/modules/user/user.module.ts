import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './domain/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [],
  controllers: [],
})
export class UserModule {}
