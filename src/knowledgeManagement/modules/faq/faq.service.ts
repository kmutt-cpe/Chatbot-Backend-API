import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFAQDto } from './dto/faq.create.dto';
import { UpdateFAQDto } from './dto/faq.update.dto';
import { FAQ } from './domain/faq.entity';
import { FAQRepository } from './domain/faq.repository';
import { UserRepository } from '../user/domain/user.repository';
import { SubcategoryRepository } from '../subcategory/domain/subcategory.repository';
import { FAQDto } from './dto/faq.dto';
import { User } from '../user/domain/user.entity';
import { Subcategory } from '../subcategory/domain/subcategory.entity';
import { Category } from '../category/domain/category.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class FAQService {
  constructor(
    private readonly faqRepo: FAQRepository,
    private readonly userRepo: UserRepository,
    private readonly subcategoryRepo: SubcategoryRepository
  ) {}

  async getAllFAQ(): Promise<FAQDto[]> {
    const faqs: FAQ[] = await this.faqRepo.findAll();
    const faqsDto: FAQDto[] = [];
    for (const faq of faqs) {
      const faqDto: FAQDto = { ...faq.getData() };
      const lastEditor: User = await faq.lastEditor;
      const subcategory: Subcategory = await faq.subcategory;
      const category: Category = await subcategory.category;
      faqDto.lastEditor = lastEditor.getData();
      faqDto.subcategory = subcategory.getData();
      faqDto.category = category.getData();
      faqsDto.push(faqDto);
    }
    return faqsDto;
  }

  async getFAQ(options?: FindManyOptions<FAQ>): Promise<FAQDto[]> {
    const faqs: FAQ[] = await this.faqRepo.find(options);
    const faqsDto: FAQDto[] = [];
    for (const faq of faqs) {
      const faqDto: FAQDto = { ...faq.getData() };
      const lastEditor: User = await faq.lastEditor;
      const subcategory: Subcategory = await faq.subcategory;
      const category: Category = await subcategory.category;
      faqDto.lastEditor = lastEditor.getData();
      faqDto.subcategory = subcategory.getData();
      faqDto.category = category.getData();
      faqsDto.push(faqDto);
    }
    return faqsDto;
  }

  async getFAQById(id: string): Promise<FAQDto> {
    const faq = await this.faqRepo.findById(id);
    if (!faq) return null;
    const faqDto: FAQDto = { ...faq.getData() };
    const lastEditor: User = await faq.lastEditor;
    const subcategory: Subcategory = await faq.subcategory;
    const category: Category = await subcategory.category;
    faqDto.lastEditor = lastEditor.getData();
    faqDto.subcategory = subcategory.getData();
    faqDto.category = category.getData();
    return faqDto;
  }

  async getFAQByCategoryId(id: string): Promise<FAQDto[]> {
    const faqs: FAQ[] = await this.faqRepo.findAll();
    const faqsDto: FAQDto[] = [];
    for (const faq of faqs) {
      const subcategory: Subcategory = await faq.subcategory;
      const category: Category = await subcategory.category;
      if (category.id !== id) continue;
      const faqDto: FAQDto = { ...faq.getData() };
      const lastEditor: User = await faq.lastEditor;
      faqDto.lastEditor = lastEditor.getData();
      faqDto.subcategory = subcategory.getData();
      faqDto.category = category.getData();
      faqsDto.push(faqDto);
    }
    return faqsDto;
  }

  async deleteFAQById(id: string): Promise<FAQDto | null> {
    let faq: FAQ = await this.faqRepo.findById(id);
    if (!faq) throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
    const lastEditor: User = await faq.lastEditor;
    const subcategory: Subcategory = await faq.subcategory;
    const category: Category = await subcategory.category;

    faq = await this.faqRepo.softRemove(faq);
    if (!faq) throw new HttpException('Cannot remove FAQ', HttpStatus.NOT_IMPLEMENTED);
    const faqDto: FAQDto = { ...faq.getData() };
    faqDto.lastEditor = lastEditor.getData();
    faqDto.subcategory = subcategory.getData();
    faqDto.category = category.getData();
    return faqDto;
  }

  async createFAQ(createFAQDto: CreateFAQDto): Promise<FAQDto> {
    let faq: FAQ = this.faqRepo.create();
    const { question, answer, subcategoryId, lastEditorId } = createFAQDto;
    const subcategory = await this.subcategoryRepo.findById(subcategoryId);
    if (!subcategory) throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    const category: Category = await subcategory.category;
    if (!category) throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    const user = await this.userRepo.findById(lastEditorId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    faq.setDataValue('question', question);
    faq.setDataValue('answer', answer);
    faq.setDataValue('subcategory', Promise.resolve(subcategory));
    faq.setDataValue('lastEditor', Promise.resolve(user));
    faq.setDataValue('updatedDate', new Date());

    faq = await this.faqRepo.save(faq);
    if (!faq) throw new HttpException('Cannot create FAQ', HttpStatus.NOT_IMPLEMENTED);
    const faqDto: FAQDto = { ...faq.getData() };
    faqDto.lastEditor = user.getData();
    faqDto.subcategory = subcategory.getData();
    faqDto.category = category.getData();
    return faqDto;
  }

  async updateFAQ(updateFAQDto: UpdateFAQDto): Promise<FAQDto> {
    const { id, question, answer, subcategoryId, lastEditorId } = updateFAQDto;
    let faq: FAQ = await this.faqRepo.findById(id);
    if (!faq) throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
    const subcategory = await this.subcategoryRepo.findById(subcategoryId);
    if (!subcategory) throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    const category: Category = await subcategory.category;
    if (!category) throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    const user = await this.userRepo.findById(lastEditorId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    faq.setDataValue('question', question);
    faq.setDataValue('answer', answer);
    faq.setDataValue('subcategory', Promise.resolve(subcategory));
    faq.setDataValue('lastEditor', Promise.resolve(user));
    faq.setDataValue('updatedDate', new Date());
    faq = await this.faqRepo.save(faq);
    if (!faq) throw new HttpException('Cannot update FAQ', HttpStatus.NOT_IMPLEMENTED);

    const faqDto: FAQDto = { ...faq.getData() };
    faqDto.lastEditor = user.getData();
    faqDto.subcategory = subcategory.getData();
    faqDto.category = category.getData();
    return faqDto;
  }
}
