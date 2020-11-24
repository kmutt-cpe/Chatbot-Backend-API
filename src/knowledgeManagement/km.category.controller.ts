import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './km.category.service';

@Controller('km/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getHello(): string {
    return this.categoryService.getHello();
  }
}
