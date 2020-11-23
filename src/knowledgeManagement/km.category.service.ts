import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getCategories(): Promise<CategoryDto[]> {
    const categories = (await this.categoryRepo.findAll()).map((category) => category.getData());
    return categories;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const { category: categoryStr } = createCategoryDto;
    const categoryEntity = this.categoryRepo.create();
    categoryEntity.category = categoryStr;

    // todo: Create subcategory in categoryDto
    return (await this.categoryRepo.save(categoryEntity)).getData();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
