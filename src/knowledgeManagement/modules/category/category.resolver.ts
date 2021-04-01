import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.create.dto';
import { UpdateCategoryDto } from './dto/category.update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => CategoryDto)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryDto])
  async getAllCategory(): Promise<CategoryDto[]> {
    return await this.categoryService.getAllCategory();
  }

  @Query(() => CategoryDto)
  async getCategoryById(@Args('id', { type: () => ID }) id: string): Promise<CategoryDto> {
    return await this.categoryService.getCategoryById(id);
  }

  @Mutation(() => CategoryDto)
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @Args('createCategoryDto') createCategoryDto: CreateCategoryDto
  ): Promise<CategoryDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Mutation(() => CategoryDto)
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryDto> {
    return await this.categoryService.updateCategory(updateCategoryDto);
  }

  @Mutation(() => CategoryDto)
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Args('id', { type: () => ID }) id: string): Promise<CategoryDto> {
    return await this.categoryService.deleteCategoryById(id);
  }
}
