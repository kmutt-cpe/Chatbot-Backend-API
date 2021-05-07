import { BaseSeeder } from '@BaseObject';
import { Subcategory as SubcategoryInterface } from '../../modules/subcategory/subcategory.interface';
import { CategorySeeder } from './category.seeder';

export class SubcategorySeeder extends BaseSeeder<SubcategoryInterface> {
  getData(): SubcategoryInterface[] {
    const categorySeeder = new CategorySeeder();
    const categories = categorySeeder.getData();

    const subcategories: SubcategoryInterface[] = [
      {
        id: 'Subcategory-0',
        subcategory: '2B-KMUTT',
        category: categories[0],
        faqs: Promise.resolve([]),
      },
      {
        id: 'Subcategory-1',
        subcategory: 'Petch Prajohm',
        category: categories[0],
        faqs: Promise.resolve([]),
      },
      {
        id: 'Subcategory-2',
        subcategory: 'Admission Recruitment',
        category: categories[1],
        faqs: Promise.resolve([]),
      },
    ];
    return subcategories;
  }
}
