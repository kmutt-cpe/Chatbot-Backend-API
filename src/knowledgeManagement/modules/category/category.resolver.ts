import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.create.dto';
import { UpdateCategoryDto } from './dto/category.update.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';

@Resolver(() => CategoryDto)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryDto])
  async getAllCategory(): Promise<CategoryDto[]> {
    return await this.categoryService.getAllCategory();
  }

  @Query(() => CategoryDto, { nullable: true })
  async getCategoryById(@Args('id', { type: () => ID }) id: string): Promise<CategoryDto> {
    return await this.categoryService.getCategoryById(id);
  }

  @Mutation(() => CategoryDto)
  @UseGuards(GqlAuthGuard)
  async createCategory(
    @Args('category') createCategoryDto: CreateCategoryDto
  ): Promise<CategoryDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Mutation(() => CategoryDto)
  @UseGuards(GqlAuthGuard)
  async updateCategory(
    @Args('category') updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryDto> {
    return await this.categoryService.updateCategory(updateCategoryDto);
  }

  @Mutation(() => CategoryDto)
  @UseGuards(GqlAuthGuard)
  async deleteCategory(@Args('id', { type: () => ID }) id: string): Promise<CategoryDto> {
    return await this.categoryService.deleteCategoryById(id);
  }
}
