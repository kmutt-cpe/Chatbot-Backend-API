import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
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
  async createFAQ(@Args('createFAQDto') createFAQDto: CreateFAQDto): Promise<FAQDto> {
    return await this.faqService.createFAQ(createFAQDto);
  }

  @Mutation(() => FAQDto)
  async updateFAQ(@Args('updateFAQDto') updateFAQDto: UpdateFAQDto): Promise<FAQDto> {
    return await this.faqService.updateFAQ(updateFAQDto);
  }

  @Mutation(() => FAQDto)
  async deleteFAQ(@Args('id', { type: () => ID }) id: string): Promise<FAQDto> {
    return await this.faqService.deleteFAQById(id);
  }
}
