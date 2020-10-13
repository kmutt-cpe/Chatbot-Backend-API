import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { Module } from '@nestjs/common';
import { FAQModule } from './faq/faq.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CategoryModule, SubcategoryModule, FAQModule, UserModule],
  providers: [],
})
export class KnowledgeManagementModule {}
