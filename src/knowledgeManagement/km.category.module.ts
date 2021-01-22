import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './km.category.controller';
import { CategoryResolver } from './km.category.resolver';
import { CategoryService } from './km.category.service';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [CategoryService, CategoryResolver],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
