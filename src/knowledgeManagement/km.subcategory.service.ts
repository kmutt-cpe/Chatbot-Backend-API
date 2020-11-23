import { Injectable } from '@nestjs/common';
import { SubcategoryRepository } from './repositories/subcategory.repository';

@Injectable()
export class SubcategoryService {
  constructor(private readonly subcategoryRepo: SubcategoryRepository) {}

  getHello(): string {
    return 'Hello World!';
  }
}
