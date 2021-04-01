import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/subcategory.create.dto';
import { UpdateSubcategoryDto } from './dto/subcategory.update.dto';
import { Subcategory } from './domain/subcategory.entity';
import { SubcategoryRepository } from './domain/subcategory.repository';
import { SubcategoryDto } from './dto/subcategory.dto';
import { Category } from '../category/domain/category.entity';
import { CategoryRepository } from '../category/domain/category.repository';

@Injectable()
export class SubcategoryService {
  constructor(
    private readonly subcategoryRepo: SubcategoryRepository,
    private readonly categoryRepo: CategoryRepository
  ) {}

  async getAllSubcategory(): Promise<SubcategoryDto[]> {
    const subcategories: Subcategory[] = await this.subcategoryRepo.findAll();
    const subcategoriesDto: SubcategoryDto[] = [];
    for (const subcategory of subcategories) {
      const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
      const category: Category = await subcategory.category;
      subcategoryDto.category = category.getData();
      subcategoriesDto.push(subcategoryDto);
    }
    return subcategoriesDto;
  }

  async getSubcategoryById(id: string): Promise<SubcategoryDto> {
    const subcategory: Subcategory = await this.subcategoryRepo.findById(id);
    const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
    const category: Category = await subcategory.category;
    subcategoryDto.category = category.getData();
    // todo: Throw error 404 if not found subcategory
    return subcategoryDto;
  }

  async deleteSubcategoryById(id: string): Promise<SubcategoryDto | null> {
    let subcategory: Subcategory = await this.subcategoryRepo.findById(id);
    if (!subcategory)
      // todo: Throw error 404 if not found subcategory
      return null;
    subcategory = await this.subcategoryRepo.softRemove(subcategory);
    const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
    const category: Category = await subcategory.category;
    subcategoryDto.category = category.getData();
    // todo: Remove subcategory
    return subcategory ? subcategoryDto : null;
  }

  async createSubcategory(createSubcategoryDto: CreateSubcategoryDto): Promise<SubcategoryDto> {
    let subcategory: Subcategory = this.subcategoryRepo.create();
    const category = await this.categoryRepo.findById(createSubcategoryDto.categoryId);
    // todo: Throw error 404 if not found category
    subcategory.setDataValues(createSubcategoryDto);
    subcategory.category = Promise.resolve(category);
    subcategory = await this.subcategoryRepo.save(subcategory);
    const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
    subcategoryDto.category = category.getData();
    return subcategoryDto;
  }

  async updateSubcategory(updateSubcategoryDto: UpdateSubcategoryDto): Promise<SubcategoryDto> {
    let subcategory = await this.subcategoryRepo.findById(updateSubcategoryDto.id);
    const category = await this.categoryRepo.findById(updateSubcategoryDto.categoryId);
    // todo: Throw error 404 if not found subcategory
    // todo: Throw error 404 if not found category
    subcategory.setDataValues(updateSubcategoryDto);
    subcategory.category = Promise.resolve(category);
    subcategory = await this.subcategoryRepo.save(subcategory);
    const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
    subcategoryDto.category = category.getData();
    return subcategoryDto;
  }
}
