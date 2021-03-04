import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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

  @Query(() => SubcategoryDto)
  async getSubcategoryById(@Args('id', { type: () => ID }) id: string): Promise<SubcategoryDto> {
    return await this.subcategoryService.getSubcategoryById(id);
  }

  @Mutation(() => SubcategoryDto)
  @UseGuards(JwtAuthGuard)
  async createSubcategory(
    @Args('createSubcategoryDto') createSubcategoryDto: CreateSubcategoryDto
  ): Promise<SubcategoryDto> {
    return await this.subcategoryService.createSubcategory(createSubcategoryDto);
  }

  @Mutation(() => SubcategoryDto)
  @UseGuards(JwtAuthGuard)
  async updateSubcategory(
    @Args('updateSubcategoryDto') updateSubcategoryDto: UpdateSubcategoryDto
  ): Promise<SubcategoryDto> {
    return await this.subcategoryService.updateSubcategory(updateSubcategoryDto);
  }

  @Mutation(() => SubcategoryDto)
  @UseGuards(JwtAuthGuard)
  async deleteSubcategory(@Args('id', { type: () => ID }) id: string): Promise<SubcategoryDto> {
    return await this.subcategoryService.deleteSubcategoryById(id);
  }
}
