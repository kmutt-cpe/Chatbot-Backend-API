import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { FAQModule } from './modules/faq/faq.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule, CategoryModule, SubcategoryModule, FAQModule, UserModule],
  providers: [],
})
export class KnowledgeManagementModule {}
