import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from './domain/category.repository';
import { CreateCategoryDto } from './dto/category.create.dto';
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

  async getCategoryById(id: string): Promise<CategoryDto> {
    const category = await this.categoryRepo.findById(id);
    if (!category) return null;
    const categoryDto: CategoryDto = { ...category.getData(), subcategories: undefined };
    const subcategories: Subcategory[] = await category.subcategories;
    categoryDto.subcategories = subcategories
      ? subcategories.map((subcategory) => subcategory.getData())
      : [];
    return categoryDto;
  }

  async deleteCategoryById(id: string): Promise<CategoryDto | null> {
    let category: Category = await this.categoryRepo.findById(id);
    if (!category) throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    if ((await category.getSubcategories()).length !== 0)
      throw new HttpException(
        'Cannot remove category because there are subcategories left',
        HttpStatus.BAD_REQUEST
      );
    category = await this.categoryRepo.softRemove(category);
    if (!category) throw new HttpException('Cannot remove category', HttpStatus.NOT_IMPLEMENTED);
    const categoryDto: CategoryDto = { ...category.getData(), subcategories: undefined };
    const subcategories: Subcategory[] = await category.subcategories;
    categoryDto.subcategories = subcategories
      ? subcategories.map((subcategory) => subcategory.getData())
      : [];

    return categoryDto;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    let category: Category = this.categoryRepo.create();
    if (!category) throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    category.setDataValues(createCategoryDto);
    category = await this.categoryRepo.save(category);
    if (!category) throw new HttpException('Cannot remove category', HttpStatus.NOT_IMPLEMENTED);
    const categoryDto: CategoryDto = { ...category.getData(), subcategories: undefined };
    const subcategories: Subcategory[] = await category.subcategories;
    categoryDto.subcategories = subcategories
      ? subcategories.map((subcategory) => subcategory.getData())
      : [];
    return categoryDto;
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    let category = await this.categoryRepo.findById(updateCategoryDto.id);
    if (!category) throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    category.setDataValues(updateCategoryDto);
    category = await this.categoryRepo.save(category);
    if (!category) throw new HttpException('Cannot remove category', HttpStatus.NOT_IMPLEMENTED);
    const categoryDto: CategoryDto = { ...category.getData(), subcategories: undefined };
    const subcategories: Subcategory[] = await category.subcategories;
    categoryDto.subcategories = subcategories
      ? subcategories.map((subcategory) => subcategory.getData())
      : [];
    return categoryDto;
  }
}
