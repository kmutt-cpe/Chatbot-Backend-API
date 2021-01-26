import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './domain/category.repository';
import { CreateCategoryDto } from './dto/category.create.dto';
// import { FindOneOptions } from 'typeorm';
import { Category } from './domain/category.entity';
import { UpdateCategoryDto } from './dto/category.update.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepo.findAll();
  }

  // async getCategory(options?: FindOneOptions<CategoryDto>): Promise<CategoryDto[]> {
  //   console.log(options);
  //   const category: Category[] = await this.categoryRepo.find(options);
  //   return category.map((item) => item.getData());
  // }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepo.findById(id);
    // todo: Throw error 404 if not found category
    return category;
  }

  // async removeCategory(options: FindOneOptions<CategoryDto>): Promise<CategoryDto[]> {
  //   let categories: Category[] = await this.categoryRepo.find(options);
  //   if (!categories) return [];
  //   categories = await this.categoryRepo.softRemove(categories);

  //   // todo: Remove subcategory
  //   return categories ? categories.map((item) => item.getData()) : [];
  // }

  async deleteCategoryById(id: string): Promise<Category | null> {
    let category: Category = await this.categoryRepo.findById(id);
    if (!category)
      // todo: Throw error 404 if not found category
      return null;
    category = await this.categoryRepo.softRemove(category);

    // todo: Remove subcategory
    return category ? category : null;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category: Category = this.categoryRepo.create();
    category.setDataValues(createCategoryDto);

    return await this.categoryRepo.save(category);
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.findById(id);
    // todo: Throw error 404 if not found category
    category.setDataValues(updateCategoryDto);
    return await this.categoryRepo.save(category);
  }
}
