import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './domain/category.repository';
import { CreateCategoryDto } from './dto/category.create.dto';
// import { FindOneOptions } from 'typeorm';
import { Category } from './domain/category.entity';
import { UpdateCategoryDto } from './dto/category.update.dto';
import { CategoryDto } from './dto/category.dto';
import { Subcategory } from '../subcategory/domain/subcategory.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAllCategory(): Promise<CategoryDto[]> {
    const categories: Category[] = await this.categoryRepo.findAll();
    const categoriesDto: CategoryDto[] = [];
    for (const category of categories) {
      const categoryDto: CategoryDto = { ...category.getData(), subcategories: undefined };
      const subcategories: Subcategory[] = await category.subcategories;
      categoryDto.subcategories = subcategories
        ? subcategories.map((subcategory) => subcategory.getData())
        : [];
      categoriesDto.push(categoryDto);
    }
    return categoriesDto;
  }

  // async getCategory(options?: FindOneOptions<CategoryDto>): Promise<CategoryDto[]> {
  //   console.log(options);
  //   const category: Category[] = await this.categoryRepo.find(options);
  //   return category.map((item) => item.getData());
  // }

  async getCategoryById(id: string): Promise<CategoryDto> {
    const category = await this.categoryRepo.findById(id);
    // todo: Throw error 404 if not found category
    const categoryDto: CategoryDto = { ...category.getData(), subcategories: undefined };
    const subcategories: Subcategory[] = await category.subcategories;
    categoryDto.subcategories = subcategories
      ? subcategories.map((subcategory) => subcategory.getData())
      : [];
    return categoryDto;
  }

  // async removeCategory(options: FindOneOptions<CategoryDto>): Promise<CategoryDto[]> {
  //   let categories: Category[] = await this.categoryRepo.find(options);
  //   if (!categories) return [];
  //   categories = await this.categoryRepo.softRemove(categories);

  //   // todo: Remove subcategory
  //   return categories ? categories.map((item) => item.getData()) : [];
  // }

  async deleteCategoryById(id: string): Promise<CategoryDto | null> {
    let category: Category = await this.categoryRepo.findById(id);
    if (!category)
      // todo: Throw error 404 if not found category
      return null;
    category = await this.categoryRepo.softRemove(category);
    const categoryDto: CategoryDto = { ...category.getData(), subcategories: undefined };
    const subcategories: Subcategory[] = await category.subcategories;
    categoryDto.subcategories = subcategories
      ? subcategories.map((subcategory) => subcategory.getData())
      : [];
    // todo: Remove subcategory
    return categoryDto;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    let category: Category = this.categoryRepo.create();
    category.setDataValues(createCategoryDto);
    category = await this.categoryRepo.save(category);
    const categoryDto: CategoryDto = { ...category.getData(), subcategories: undefined };
    const subcategories: Subcategory[] = await category.subcategories;
    categoryDto.subcategories = subcategories
      ? subcategories.map((subcategory) => subcategory.getData())
      : [];
    return categoryDto;
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    let category = await this.categoryRepo.findById(updateCategoryDto.id);
    // todo: Throw error 404 if not found category
    category.setDataValues(updateCategoryDto);
    category = await this.categoryRepo.save(category);
    const categoryDto: CategoryDto = { ...category.getData(), subcategories: undefined };
    const subcategories: Subcategory[] = await category.subcategories;
    categoryDto.subcategories = subcategories
      ? subcategories.map((subcategory) => subcategory.getData())
      : [];
    return categoryDto;
  }
}
