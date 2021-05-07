import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (!subcategory) return null;
    const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
    const category: Category = await subcategory.category;
    subcategoryDto.category = category.getData();
    return subcategoryDto;
  }

  async getSubcategoryByCategoryId(categoryId: string): Promise<SubcategoryDto[]> {
    const subcategories: Subcategory[] = await this.subcategoryRepo.findAll();
    const subcategoriesDto: SubcategoryDto[] = [];
    for (const subcategory of subcategories) {
      if (categoryId === (await subcategory.category).id) {
        const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
        const category: Category = await subcategory.category;
        subcategoryDto.category = category.getData();
        subcategoriesDto.push(subcategoryDto);
      }
    }
    return subcategoriesDto;
  }

  async deleteSubcategoryById(id: string): Promise<SubcategoryDto | null> {
    let subcategory: Subcategory = await this.subcategoryRepo.findById(id);
    if (!subcategory) throw new HttpException('Not found subcategory', HttpStatus.NOT_FOUND);
    if ((await subcategory.faqs).length !== 0)
      throw new HttpException(
        'Cannot remove subcategory because there are faqs left in subcategory',
        HttpStatus.BAD_REQUEST
      );
    const categoryDto = (await subcategory.category).getData();
    subcategory = await this.subcategoryRepo.softRemove(subcategory);
    if (!subcategory)
      throw new HttpException('Cannot remove subcategory', HttpStatus.NOT_IMPLEMENTED);
    const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
    subcategoryDto.category = categoryDto;
    return subcategoryDto;
  }

  async createSubcategory(createSubcategoryDto: CreateSubcategoryDto): Promise<SubcategoryDto> {
    let subcategory: Subcategory = this.subcategoryRepo.create();
    const category = await this.categoryRepo.findById(createSubcategoryDto.categoryId);
    if (!category) throw new HttpException('Not found category', HttpStatus.NOT_FOUND);
    subcategory.setDataValues(createSubcategoryDto);
    subcategory.category = Promise.resolve(category);
    subcategory = await this.subcategoryRepo.save(subcategory);
    if (!subcategory)
      throw new HttpException('Cannot create subcategory', HttpStatus.NOT_IMPLEMENTED);
    const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
    subcategoryDto.category = category.getData();
    return subcategoryDto;
  }

  async updateSubcategory(updateSubcategoryDto: UpdateSubcategoryDto): Promise<SubcategoryDto> {
    let subcategory = await this.subcategoryRepo.findById(updateSubcategoryDto.id);
    if (!subcategory)
      throw new HttpException('Not found category or subcategory', HttpStatus.NOT_FOUND);
    subcategory.subcategory = updateSubcategoryDto.subcategory;
    subcategory = await this.subcategoryRepo.save(subcategory);
    if (!subcategory)
      throw new HttpException('Cannot update subcategory', HttpStatus.NOT_IMPLEMENTED);
    const subcategoryDto: SubcategoryDto = { ...subcategory.getData(), category: undefined };
    subcategoryDto.category = (await subcategory.category).getData();
    return subcategoryDto;
  }
}
