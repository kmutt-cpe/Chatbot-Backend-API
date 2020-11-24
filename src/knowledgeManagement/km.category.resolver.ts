import { Resolver, Query, ID, Args } from '@nestjs/graphql';
import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './km.category.service';

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
}
