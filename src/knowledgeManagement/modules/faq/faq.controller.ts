import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFAQDto } from './dto/faq.create.dto';
import { FAQDto } from './dto/faq.dto';
import { UpdateFAQDto } from './dto/faq.update.dto';
import { FAQService } from './faq.service';

@Controller('km/faq')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @Get()
  async getFAQ(): Promise<FAQDto[]> {
    const faqEntities = await this.faqService.getAllFAQ();
    const faqs: FAQDto[] = [];
    for (const faqEntity of faqEntities) faqs.push(await faqEntity.getData());
    return faqs;
  }

  @Get(':id')
  async getFAQById(@Param('id') id: string): Promise<FAQDto> {
    return await (await this.faqService.getFAQById(id)).getData();
  }

  @Patch()
  async updateFaq(
    @Body('id') id: string,
    @Body('update') updateFAQDto: UpdateFAQDto
  ): Promise<FAQDto> {
    return await (await this.faqService.updateFAQ(updateFAQDto)).getData();
  }

  @Post()
  async createFaq(@Body() createCategoryDto: CreateFAQDto): Promise<FAQDto> {
    return await (await this.faqService.createFAQ(createCategoryDto)).getData();
  }

  @Delete()
  async deleteFaq(@Body('id') id: string): Promise<FAQDto> {
    return await (await this.faqService.deleteFAQById(id)).getData();
  }
}
