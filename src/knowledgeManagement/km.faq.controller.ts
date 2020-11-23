import { Controller, Get } from '@nestjs/common';
import { FAQService } from './km.faq.service';

@Controller('km/faq')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @Get()
  getHello(): string {
    return this.faqService.getHello();
  }
}
