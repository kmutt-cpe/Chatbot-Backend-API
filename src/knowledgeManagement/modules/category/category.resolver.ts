import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.create.dto';
import { UpdateCategoryDto } from './dto/category.update.dto';

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
  async createCategory(
    @Args('createCategoryDto') createCategoryDto: CreateCategoryDto
  ): Promise<CategoryDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Mutation(() => CategoryDto)
  async updateCategory(
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryDto> {
    return await this.categoryService.updateCategory(updateCategoryDto);
  }

  @Mutation(() => CategoryDto)
  async deleteCategory(@Args('id', { type: () => ID }) id: string): Promise<CategoryDto> {
    return await this.categoryService.deleteCategoryById(id);
  }
}
