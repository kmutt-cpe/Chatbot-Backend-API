import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryDto } from './dto/category.create.dto';
// import { FindOneOptions } from 'typeorm';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/category.update.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAllCategory(): Promise<CategoryDto[]> {
    const categories: Category[] = await this.categoryRepo.findAll();
    return categories.map((item) => item.getData());
  }

  async getCategoryById(id: string): Promise<CategoryDto> {
    const category = await this.categoryRepo.findById(id);
    // todo: Throw error 404 if not found category
    return category.getData();
  }

  async deleteCategoryById(id: string): Promise<CategoryDto | null> {
    let category: Category = await this.categoryRepo.findById(id);
    if (!category)
      // todo: Throw error 404 if not found category
      return null;
    category = await this.categoryRepo.softRemove(category);

    // todo: Remove subcategory
    return category ? category.getData() : null;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category: Category = this.categoryRepo.create();
    category.setDataValues(createCategoryDto);

    return (await this.categoryRepo.save(category)).getData();
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryRepo.findById(id);
    // todo: Throw error 404 if not found category
    category.setDataValues(updateCategoryDto);
    return await (await this.categoryRepo.save(category)).getData();
  }
}
