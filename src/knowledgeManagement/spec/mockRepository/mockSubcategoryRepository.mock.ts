import { MockBaseRepository } from '@BaseObject';
import { Subcategory } from '../../modules/subcategory/domain/subcategory.entity';
import { Subcategory as SubcategoryInterface } from '../../modules/subcategory/subcategory.interface';
import { MockCategoryRepository } from './mockCategoryRepository.mock';

export class MockSubcategoryRepository extends MockBaseRepository<Subcategory> {
  private subcategoriesData = [];

  constructor() {
    super(Subcategory);
  }

  setup(data: SubcategoryInterface[]): void {
    this.subcategoriesData = [...data];
    this.mockData(data);
  }

  async mockCategories(categoryRepository: MockCategoryRepository): Promise<void> {
    if (this.data === []) throw new Error(`Need to set up ${this.EntityName}Repository first`);
    for (const subcategory of this.subcategoriesData) {
      const categoryId: string = subcategory.category.id;
      const category = await categoryRepository.findById(categoryId);
      subcategory.category = Promise.resolve(category);
    }
  }
}
