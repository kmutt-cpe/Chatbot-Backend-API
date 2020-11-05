import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryRepository } from './repositories/subcategory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryRepository])],
  providers: [],
  controllers: [],
})
export class SubcategoryModule {}
