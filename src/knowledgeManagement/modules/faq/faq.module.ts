import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FAQController } from './faq.controller';
import { FAQService } from './faq.service';
import { SubcategoryModule } from '../subcategory/subcategory.module';
import { FAQRepository } from './domain/faq.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FAQRepository]), SubcategoryModule, UserModule],
  providers: [FAQService],
  controllers: [FAQController],
})
export class FAQModule {}
