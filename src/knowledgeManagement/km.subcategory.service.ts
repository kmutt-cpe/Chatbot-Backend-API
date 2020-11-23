import { Injectable } from '@nestjs/common';

@Injectable()
export class SubcategoryService {
  getHello(): string {
    return 'Hello World!';
  }
}
