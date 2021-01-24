import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryRepository } from './domain/subcategory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryRepository]), CategoryModule],
  providers: [SubcategoryService],
  controllers: [SubcategoryController],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
