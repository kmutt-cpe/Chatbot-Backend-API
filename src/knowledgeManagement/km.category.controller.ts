import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CategoryService } from './km.category.service';

@Controller('km/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('get-categories')
  async getCategories(): Promise<CategoryDto[]> {
    return await this.categoryService.getCategories();
  }

  @Post('create-category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  getHello(): string {
    return this.categoryService.getHello();
  }
}
