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
    return await this.faqService.getAllFAQ();
  }

  @Get(':id')
  async getFAQById(@Param('id') id: string): Promise<FAQDto> {
    return await this.faqService.getFAQById(id);
  }

  @Patch()
  async updateFaq(@Body('update') updateFAQDto: UpdateFAQDto): Promise<FAQDto> {
    return await this.faqService.updateFAQ(updateFAQDto);
  }

  @Post()
  async createFaq(@Body() createCategoryDto: CreateFAQDto): Promise<FAQDto> {
    return await this.faqService.createFAQ(createCategoryDto);
  }

  @Delete()
  async deleteFaq(@Body('id') id: string): Promise<FAQDto> {
    return await this.faqService.deleteFAQById(id);
  }
}
