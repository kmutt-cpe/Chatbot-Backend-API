import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './km.category.module';
import { SubcategoryController } from './km.subcategory.controller';
import { SubcategoryService } from './km.subcategory.service';
import { SubcategoryRepository } from './repositories/subcategory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryRepository]), CategoryModule],
  providers: [SubcategoryService],
  controllers: [SubcategoryController],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
