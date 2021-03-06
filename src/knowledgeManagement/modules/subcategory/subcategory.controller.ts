import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSubcategoryDto } from './dto/subcategory.create.dto';
import { SubcategoryDto } from './dto/subcategory.dto';
import { UpdateSubcategoryDto } from './dto/subcategory.update.dto';
import { SubcategoryService } from './subcategory.service';

@Controller('km/subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get()
  async getSubcategory(): Promise<SubcategoryDto[]> {
    return await Promise.all(
      (await this.subcategoryService.getAllSubcategory()).map(
        async (subcategory) => await subcategory
      )
    );
  }

  @Get(':id')
  async getSubcategoryById(@Param('id') id: string): Promise<SubcategoryDto> {
    return await this.subcategoryService.getSubcategoryById(id);
  }

  // todo: Implement get subcategory by categoryId

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateSubcategory(
    @Body('update') updateSubcategoryDto: UpdateSubcategoryDto
  ): Promise<SubcategoryDto> {
    return await this.subcategoryService.updateSubcategory(updateSubcategoryDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSubcategory(
    @Body() createSubcategoryDto: CreateSubcategoryDto
  ): Promise<SubcategoryDto> {
    return await this.subcategoryService.createSubcategory(createSubcategoryDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteSubcategory(@Body('id') id: string): Promise<SubcategoryDto> {
    return await this.subcategoryService.deleteSubcategoryById(id);
  }
}
