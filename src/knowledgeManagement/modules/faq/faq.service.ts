import { Injectable } from '@nestjs/common';
import { CreateFAQDto } from './dto/faq.create.dto';
import { UpdateFAQDto } from './dto/faq.update.dto';
import { FAQ } from './domain/faq.entity';
import { FAQRepository } from './domain/faq.repository';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { UserService } from '../user/user.service';

@Injectable()
export class FAQService {
  constructor(
    private readonly faqRepo: FAQRepository,
    private readonly userService: UserService,
    private readonly subcategoryService: SubcategoryService
  ) {}

  async getAllFAQ(): Promise<FAQ[]> {
    return await this.faqRepo.findAll();
  }

  async getFAQById(id: string): Promise<FAQ> {
    const faq = await this.faqRepo.findById(id);
    // todo: Throw error 404 if not found faq
    return faq;
  }

  async deleteFAQById(id: string): Promise<FAQ | null> {
    let faq: FAQ = await this.faqRepo.findById(id);
    if (!faq)
      // todo: Throw error 404 if not found faq
      return null;
    faq = await this.faqRepo.softRemove(faq);
    // todo: Remove faq
    return faq ? faq : null;
  }

  async createFAQ(createFAQDto: CreateFAQDto): Promise<FAQ> {
    const faq: FAQ = this.faqRepo.create();
    const { question, answer, subcategoryId, lastEditorId } = createFAQDto;
    const subcategory = await this.subcategoryService.getSubcategoryById(subcategoryId);
    const user = await this.userService.getUserById(lastEditorId);
    faq.setDataValue('question', question);
    faq.setDataValue('answer', answer);
    faq.setDataValue('subcategory', Promise.resolve(subcategory));
    faq.setDataValue('lastEditor', Promise.resolve(user));
    return await this.faqRepo.save(faq);
  }

  async updateFAQ(updateFAQDto: UpdateFAQDto): Promise<FAQ> {
    const { id, question, answer, subcategoryId, lastEditorId } = updateFAQDto;
    const faq: FAQ = await this.faqRepo.findById(id);
    const subcategory = await this.subcategoryService.getSubcategoryById(subcategoryId);
    const user = await this.userService.getUserById(lastEditorId);
    // todo: Throw error 404 if not found faq, subcategory, and user
    faq.setDataValue('question', question);
    faq.setDataValue('answer', answer);
    faq.setDataValue('subcategory', Promise.resolve(subcategory));
    faq.setDataValue('lastEditor', Promise.resolve(user));
    return await this.faqRepo.save(faq);
  }
}
