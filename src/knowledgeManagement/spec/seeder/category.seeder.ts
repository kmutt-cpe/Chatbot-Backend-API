import { BaseSeeder } from '@BaseObject';
import { Category as CategoryInterface } from '../../modules/category/category.interface';

export class CategorySeeder extends BaseSeeder<CategoryInterface> {
  getData(): CategoryInterface[] {
    const categories = [
      {
        id: 'Category-0',
        category: 'Admission',
        subcategories: Promise.resolve([]),
      },
      { id: 'Category-1', category: 'Internship', subcategories: Promise.resolve([]) },
    ];
    return categories;
  }
}
