import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/subcategory.create.dto';
import { UpdateSubcategoryDto } from './dto/subcategory.update.dto';
import { Subcategory } from './entities/subcategory.entity';
import { CategoryService } from './km.category.service';
import { SubcategoryRepository } from './repositories/subcategory.repository';

@Injectable()
export class SubcategoryService {
  constructor(
    private readonly subcategoryRepo: SubcategoryRepository,
    private readonly categoryService: CategoryService
  ) {}

  async getAllSubcategory(): Promise<Subcategory[]> {
    return await this.subcategoryRepo.findAll();
  }

  async getSubcategoryById(id: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepo.findById(id);
    // todo: Throw error 404 if not found subcategory
    return subcategory;
  }

  async deleteSubcategoryById(id: string): Promise<Subcategory | null> {
    let subcategory: Subcategory = await this.subcategoryRepo.findById(id);
    if (!subcategory)
      // todo: Throw error 404 if not found subcategory
      return null;
    subcategory = await this.subcategoryRepo.softRemove(subcategory);

    // todo: Remove subcategory
    return subcategory ? subcategory : null;
  }

  async createSubcategory(createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    const subcategory: Subcategory = this.subcategoryRepo.create();
    const category = await this.categoryService.getCategoryById(createSubcategoryDto.categoryId);
    // todo: Throw error 404 if not found category
    subcategory.setDataValues(createSubcategoryDto);
    subcategory.category = Promise.resolve(category);
    return await this.subcategoryRepo.save(subcategory);
  }

  async updateSubcategory(
    id: string,
    updateSubcategoryDto: UpdateSubcategoryDto
  ): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepo.findById(id);
    const category = await this.categoryService.getCategoryById(updateSubcategoryDto.categoryId);
    // todo: Throw error 404 if not found subcategory
    // todo: Throw error 404 if not found category
    subcategory.setDataValues(updateSubcategoryDto);
    subcategory.category = Promise.resolve(category);
    return await this.subcategoryRepo.save(subcategory);
  }
}
