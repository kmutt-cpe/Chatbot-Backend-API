import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FAQRepository } from './repositories/faq.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FAQRepository])],
  providers: [],
  controllers: [],
})
export class FAQModule {}
