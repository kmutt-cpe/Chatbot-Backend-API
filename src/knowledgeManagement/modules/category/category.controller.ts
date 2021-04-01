import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/category.create.dto';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/category.update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('km/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategory(): Promise<CategoryDto[]> {
    return await this.categoryService.getAllCategory();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<CategoryDto> {
    return await this.categoryService.getCategoryById(id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateCategory(@Body('update') updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    return await this.categoryService.updateCategory(updateCategoryDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Body('id') id: string): Promise<CategoryDto> {
    return await this.categoryService.deleteCategoryById(id);
  }
}
