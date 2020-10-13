import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [],
  controllers: [],
})
export class CategoryModule {}
