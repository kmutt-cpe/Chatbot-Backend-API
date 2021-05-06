import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CreateSubcategoryDto } from './dto/subcategory.create.dto';
import { SubcategoryDto } from './dto/subcategory.dto';
import { UpdateSubcategoryDto } from './dto/subcategory.update.dto';
import { SubcategoryService } from './subcategory.service';

@Resolver(() => SubcategoryDto)
export class SubategoryResolver {
  constructor(private subcategoryService: SubcategoryService) {}

  @Query(() => [SubcategoryDto])
  async getAllSubcategory(): Promise<SubcategoryDto[]> {
    return await this.subcategoryService.getAllSubcategory();
  }

  @Query(() => SubcategoryDto, { nullable: true })
  async getSubcategoryById(@Args('id', { type: () => ID }) id: string): Promise<SubcategoryDto> {
    return await this.subcategoryService.getSubcategoryById(id);
  }

  @Query(() => [SubcategoryDto])
  async getSubcategoryByCategoryId(
    @Args('id', { type: () => ID }) id: string
  ): Promise<SubcategoryDto[]> {
    return await this.subcategoryService.getSubcategoryByCategoryId(id);
  }

  @Mutation(() => SubcategoryDto)
  @UseGuards(GqlAuthGuard)
  async createSubcategory(
    @Args('subcategory') createSubcategoryDto: CreateSubcategoryDto
  ): Promise<SubcategoryDto> {
    return await this.subcategoryService.createSubcategory(createSubcategoryDto);
  }

  @Mutation(() => SubcategoryDto)
  @UseGuards(GqlAuthGuard)
  async updateSubcategory(
    @Args('subcategory') updateSubcategoryDto: UpdateSubcategoryDto
  ): Promise<SubcategoryDto> {
    return await this.subcategoryService.updateSubcategory(updateSubcategoryDto);
  }

  @Mutation(() => SubcategoryDto)
  @UseGuards(GqlAuthGuard)
  async deleteSubcategory(@Args('id', { type: () => ID }) id: string): Promise<SubcategoryDto> {
    return await this.subcategoryService.deleteSubcategoryById(id);
  }
}
