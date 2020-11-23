import { Controller, Get } from '@nestjs/common';
import { SubcategoryService } from './km.subcategory.service';

@Controller('km/subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get()
  getHello(): string {
    return this.subcategoryService.getHello();
  }
}
