import { Injectable } from '@nestjs/common';

@Injectable()
export class FAQService {
  getHello(): string {
    return 'Hello World!';
  }
}
