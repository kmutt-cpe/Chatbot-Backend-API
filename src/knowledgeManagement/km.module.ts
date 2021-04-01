import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { FAQModule } from './modules/faq/faq.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CategoryModule, SubcategoryModule, FAQModule, UserModule],
  providers: [],
})
export class KnowledgeManagementModule {}
