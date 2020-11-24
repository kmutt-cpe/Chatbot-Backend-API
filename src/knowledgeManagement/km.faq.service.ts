import { Injectable } from '@nestjs/common';
import { FAQRepository } from './repositories/faq.repository';

@Injectable()
export class FAQService {
  constructor(private readonly faqRepo: FAQRepository) {}

  getHello(): string {
    return 'Hello World!';
  }
}
