import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFAQDto } from './dto/faq.create.dto';
import { FAQDto } from './dto/faq.dto';
import { UpdateFAQDto } from './dto/faq.update.dto';
import { FAQService } from './faq.service';

@Resolver(() => FAQDto)
export class FAQResolver {
  constructor(private faqService: FAQService) {}

  @Query(() => [FAQDto])
  async getAllFAQ(): Promise<FAQDto[]> {
    return await this.faqService.getAllFAQ();
  }

  @Query(() => FAQDto)
  async getFAQById(@Args('id', { type: () => ID }) id: string): Promise<FAQDto> {
    return await this.faqService.getFAQById(id);
  }

  @Mutation(() => FAQDto)
  @UseGuards(JwtAuthGuard)
  async createFAQ(@Args('createFAQDto') createFAQDto: CreateFAQDto): Promise<FAQDto> {
    return await this.faqService.createFAQ(createFAQDto);
  }

  @Mutation(() => FAQDto)
  @UseGuards(JwtAuthGuard)
  async updateFAQ(@Args('updateFAQDto') updateFAQDto: UpdateFAQDto): Promise<FAQDto> {
    return await this.faqService.updateFAQ(updateFAQDto);
  }

  @Mutation(() => FAQDto)
  @UseGuards(JwtAuthGuard)
  async deleteFAQ(@Args('id', { type: () => ID }) id: string): Promise<FAQDto> {
    return await this.faqService.deleteFAQById(id);
  }
}
