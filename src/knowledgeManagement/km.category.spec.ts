import { CategoryService } from './km.category.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories/category.repository';
import { Category } from './entities/category.entity';
import { Category as CategoryInterface } from './interfaces/category.interface';
import { MockBaseRepository } from '@BaseObject';
class MockCategoryRepository extends MockBaseRepository<Category> {
  constructor() {
    super(Category);
    this.mockData(MockCategoryRepository.getSeedData());
  }

  static getSeedData() {
    const categoryData: CategoryInterface[] = [
      {
        id: 'Category-0',
        category: 'admission',
        subcategories: Promise.resolve([]),
      },
      { id: 'Category-1', category: 'internship', subcategories: Promise.resolve([]) },
    ];
    return categoryData;
  }
}

describe('CategoryService', () => {
  let categoryService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getCustomRepositoryToken(CategoryRepository),
          useClass: MockCategoryRepository,
        },
      ],
    }).compile();
    categoryService = await moduleRef.resolve(CategoryService);
  });

  describe('getAllCategory', () => {
    it('it should return all category', async () => {
      const expectedData = MockCategoryRepository.getSeedData().map((expectedItem) => {
        expectedItem.subcategories = undefined;
        return expectedItem;
      });
      const categories = (await categoryService.getAllCategory()).map((category) =>
        category.getData()
      );
      return expect(categories).toStrictEqual(expectedData);
    });
  });

  describe('getCategoryById', () => {
    it('it should return the correctly category', async () => {
      const expectedData = MockCategoryRepository.getSeedData()[0];
      expectedData.subcategories = undefined;
      const category = await categoryService.getCategoryById('Category-0');
      return expect(category.getData()).toStrictEqual(expectedData);
    });
  });

  describe('createCategory', () => {
    let retData;
    const inputData = { category: 'registration' };

    beforeEach(async () => {
      retData = await categoryService.createCategory(inputData);
    });

    it('it should return new category', async () => {
      const expectedData = { id: 'Category-2', ...inputData, subcategories: undefined };
      expect(retData.getData()).toStrictEqual(expectedData);
    });

    it('it should add new category', async () => {
      const expectedData = MockCategoryRepository.getSeedData().map((expectedItem) => {
        expectedItem.subcategories = undefined;
        return expectedItem;
      });
      expectedData.push({ id: 'Category-2', ...inputData, subcategories: undefined });

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(3);
      expect(categories.map((category) => category.getData())).toStrictEqual(expectedData);
    });
  });

  describe('updateCategory', () => {
    let retData;
    const id = 'Category-0';
    const updatedData = { category: 'registration' };

    beforeEach(async () => {
      retData = await categoryService.updateCategory(id, updatedData);
    });

    it('it should return updated category', async () => {
      const expectedData = { id, ...updatedData, subcategories: undefined };
      expect(retData.getData()).toStrictEqual(expectedData);
    });

    it('it should update category', async () => {
      const expectedData = MockCategoryRepository.getSeedData().map((expectedItem) => {
        expectedItem.subcategories = undefined;
        return expectedItem;
      });
      expectedData[0].category = updatedData.category;

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(2);
      expect(categories.map((category) => category.getData())).toStrictEqual(expectedData);
    });
  });

  describe('deleteCategory', () => {
    let retData;
    const id = 'Category-0';
    beforeEach(async () => {
      retData = await categoryService.deleteCategoryById(id);
    });

    it('it should return deleted category', async () => {
      const expectedData = MockCategoryRepository.getSeedData()[0];
      expectedData.subcategories = undefined;
      expect(retData.getData()).toStrictEqual(expectedData);
    });

    it('it should delete category', async () => {
      const expectedData = MockCategoryRepository.getSeedData().map((expectedItem) => {
        expectedItem.subcategories = undefined;
        return expectedItem;
      });
      expectedData.shift();

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(1);
      expect(categories.map((category) => category.getData())).toStrictEqual(expectedData);
    });
  });
});
