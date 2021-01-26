import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FAQController } from './faq.controller';
import { FAQService } from './faq.service';
import { SubcategoryModule } from '../subcategory/subcategory.module';
import { FAQRepository } from './domain/faq.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FAQRepository]), SubcategoryModule],
  providers: [FAQService],
  controllers: [FAQController],
})
export class FAQModule {}
