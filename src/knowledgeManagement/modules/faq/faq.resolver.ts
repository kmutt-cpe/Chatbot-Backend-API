import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
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

  @Query(() => FAQDto, { nullable: true })
  async getFAQById(@Args('id', { type: () => ID }) id: string): Promise<FAQDto> {
    return await this.faqService.getFAQById(id);
  }

  @Mutation(() => FAQDto)
  @UseGuards(GqlAuthGuard)
  async createFAQ(@Args('faq') createFAQDto: CreateFAQDto): Promise<FAQDto> {
    return await this.faqService.createFAQ(createFAQDto);
  }

  @Mutation(() => FAQDto)
  @UseGuards(GqlAuthGuard)
  async updateFAQ(@Args('faq') updateFAQDto: UpdateFAQDto): Promise<FAQDto> {
    return await this.faqService.updateFAQ(updateFAQDto);
  }

  @Mutation(() => FAQDto)
  @UseGuards(GqlAuthGuard)
  async deleteFAQ(@Args('id', { type: () => ID }) id: string): Promise<FAQDto> {
    return await this.faqService.deleteFAQById(id);
  }
}
