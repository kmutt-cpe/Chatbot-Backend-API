import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/subcategory.create.dto';
import { SubcategoryDto } from './dto/subcategory.dto';
import { UpdateSubcategoryDto } from './dto/subcategory.update.dto';
import { SubcategoryService } from './subcategory.service';

@Controller('km/subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get()
  async getCategory(): Promise<SubcategoryDto[]> {
    return (await this.subcategoryService.getAllSubcategory()).map((subcategory) =>
      subcategory.getData()
    );
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<SubcategoryDto> {
    return (await this.subcategoryService.getSubcategoryById(id)).getData();
  }

  @Patch()
  async updateCategory(
    @Body('id') id: string,
    @Body('update') updateCategoryDto: UpdateSubcategoryDto
  ): Promise<SubcategoryDto> {
    return (await this.subcategoryService.updateSubcategory(id, updateCategoryDto)).getData();
  }

  @Post()
  async createCategory(
    @Body() createSubcategoryDto: CreateSubcategoryDto
  ): Promise<SubcategoryDto> {
    return (await this.subcategoryService.createSubcategory(createSubcategoryDto)).getData();
  }

  @Delete()
  async deleteCategory(@Body('id') id: string): Promise<SubcategoryDto> {
    return (await this.subcategoryService.deleteSubcategoryById(id)).getData();
  }
}
