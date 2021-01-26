import { Injectable } from '@nestjs/common';
import { CreateFAQDto } from './dto/faq.create.dto';
import { UpdateFAQDto } from './dto/faq.update.dto';
import { FAQ } from './domain/faq.entity';
import { FAQRepository } from './domain/faq.repository';

@Injectable()
export class FAQService {
  constructor(
    private readonly faqRepo: FAQRepository // private readonly subcategoryRepo: SubcategoryRepository
  ) {}

  async getAllFAQ(): Promise<FAQ[]> {
    return await this.faqRepo.findAll();
  }

  async getFAQById(id: string): Promise<FAQ> {
    const faq = await this.faqRepo.findById(id);
    // todo: Throw error 404 if not found category
    return faq;
  }

  async deleteFAQById(id: string): Promise<FAQ | null> {
    let faq: FAQ = await this.faqRepo.findById(id);
    if (!faq)
      // todo: Throw error 404 if not found category
      return null;
    faq = await this.faqRepo.softRemove(faq);

    // todo: Remove subcategory
    return faq ? faq : null;
  }

  async createFAQ(createFAQDto: CreateFAQDto): Promise<FAQ> {
    const faq: FAQ = this.faqRepo.create();
    faq.setDataValues(createFAQDto);
    return await this.faqRepo.save(faq);
  }

  async updateFAQ(updateFAQDto: UpdateFAQDto): Promise<FAQ> {
    const faq = await this.faqRepo.findById(updateFAQDto.id);
    // todo: Throw error 404 if not found category
    faq.setDataValues(updateFAQDto);
    // faq.subcategory = Promise.resolve(
    //   await this.subcategoryRepo.findById(updateFAQDto.subcategoryId)
    // );
    return await this.faqRepo.save(faq);
  }
}
