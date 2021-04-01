import { MockBaseRepository } from '@BaseObject';
import { Subcategory } from 'knowledgeManagement/modules/subcategory/domain/subcategory.entity';
import { Category } from '../../modules/category/domain/category.entity';
import { Category as CategoryInterface } from '../../modules/category/category.interface';
import { MockSubcategoryRepository } from './mockSubcategoryRepository.mock';

export class MockCategoryRepository extends MockBaseRepository<Category> {
  constructor() {
    super(Category);
  }

  setup(data: CategoryInterface[]): void {
    this.mockData(data);
  }

  async mockSubcategories(subcategoryRepository: MockSubcategoryRepository): Promise<void> {
    const categoriesId = [];
    const subcategories = await subcategoryRepository.findAll();
    for (const subcategory of subcategories) {
      const categoryId = (await subcategory.category).id;
      if (!categoriesId.includes(categoryId)) categoriesId.push(categoryId);
    }

    for (const categoryId of categoriesId) {
      const categoryEntity = await this.findById(categoryId);
      const subcategoryGroup = [];
      for (const subcategory of subcategories)
        if (categoryId === (await subcategory.category).id) subcategoryGroup.push(subcategory);
      categoryEntity.subcategories = Promise.resolve(subcategoryGroup);
    }
  }
}
