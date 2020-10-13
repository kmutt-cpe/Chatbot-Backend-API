import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CategoryModule],
  providers: [],
  controllers: [],
})
export class KnowledgeManagementModule {}
