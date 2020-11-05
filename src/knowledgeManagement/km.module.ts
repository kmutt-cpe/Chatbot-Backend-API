import { Module } from '@nestjs/common';
import { CategoryModule } from './km.category.module';
import { SubcategoryModule } from './km.subcategory.module';
import { FAQModule } from './km.faq.module';
import { UserModule } from './km.user.module';

@Module({
  imports: [CategoryModule, SubcategoryModule, FAQModule, UserModule],
  providers: [],
})
export class KnowledgeManagementModule {}
