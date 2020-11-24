import { CategoryService } from './km.category.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories/category.repository';
import { Category } from './entities/category.entity';
import { Category as CategoryInterface } from './interfaces/category.interface';
import { MockBaseRepository } from '@BaseObject';
import { CreateCategoryDto } from './dto/category.create.dto';
import { UpdateCategoryDto } from './dto/category.update.dto';

class MockCategoryRepository extends MockBaseRepository<Category> {
  constructor() {
    super(Category);
    this.mockData(MockCategoryRepository.getSeedData());
  }

  static getSeedData() {
    const categoryData: CategoryInterface[] = [
      { id: 'Category-0', category: 'internship', subcategories: [] },
      { id: 'Category-1', category: 'admission', subcategories: [] },
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
      const expectedData = MockCategoryRepository.getSeedData();
      const category = await categoryService.getAllCategory();
      return expect(category).toStrictEqual(expectedData);
    });
  });

  describe('getCategoryById', () => {
    it('it should return the correctly category', async () => {
      const expectedData = MockCategoryRepository.getSeedData()[0];
      const category = await categoryService.getCategoryById('Category-0');
      return expect(category).toStrictEqual(expectedData);
    });
  });

  describe('createCategory', () => {
    let retData;
    const inputData = { category: 'registration', subcategories: [] };

    beforeEach(async () => {
      retData = await categoryService.createCategory(inputData);
    });

    it('it should return new category', async () => {
      const expectedData = { id: 'Category-2', ...inputData, subcategories: [] };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should add new category', async () => {
      const expectedData = MockCategoryRepository.getSeedData();
      expectedData.push({ id: 'Category-2', ...inputData, subcategories: [] });

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(3);
      expect(categories).toStrictEqual(expectedData);
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
      const expectedData = { id, ...updatedData, subcategories: [] };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should update category', async () => {
      const expectedData = MockCategoryRepository.getSeedData();
      expectedData[0].category = updatedData.category;

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(2);
      expect(categories).toStrictEqual(expectedData);
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
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should delete category', async () => {
      const expectedData = MockCategoryRepository.getSeedData();
      expectedData.shift();

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(1);
      expect(categories).toStrictEqual(expectedData);
    });
  });
});
