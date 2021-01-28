import { CategoryService } from './category.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { CategoryRepository } from './domain/category.repository';
import { MockCategoryRepository } from '../../spec/mockRepository/mockCategoryRepository.mock';
import { CategorySeeder } from '../../spec/seeder/category.seeder';
import { Category as CategoryInterface } from '../category/category.interface';

describe('CategoryService', () => {
  let categoryService;

  beforeEach(async () => {
    const categorySeeder: CategorySeeder = new CategorySeeder();
    const categoryData: CategoryInterface[] = categorySeeder.getData();
    const mockCategoryRepository: MockCategoryRepository = new MockCategoryRepository();
    mockCategoryRepository.setup(categoryData);

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getCustomRepositoryToken(CategoryRepository),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();
    categoryService = await moduleRef.resolve(CategoryService);
  });

  describe('getAllCategory', () => {
    it('it should return all category', async () => {
      const expectedData = [
        {
          id: 'Category-0',
          category: 'Admission',
          subcategories: undefined,
        },
        { id: 'Category-1', category: 'Internship', subcategories: undefined },
      ];
      const categories = (await categoryService.getAllCategory()).map((category) =>
        category.getData()
      );
      return expect(categories).toStrictEqual(expectedData);
    });
  });

  describe('getCategoryById', () => {
    it('it should return the correctly category', async () => {
      const expectedData = {
        id: 'Category-0',
        category: 'Admission',
        subcategories: undefined,
      };
      const category = await categoryService.getCategoryById('Category-0');
      return expect(category.getData()).toStrictEqual(expectedData);
    });
  });

  describe('createCategory', () => {
    let retData;
    const inputData = { category: 'Registration' };

    beforeEach(async () => {
      retData = await categoryService.createCategory(inputData);
    });

    it('it should return new category', async () => {
      const expectedData = { id: 'Category-2', category: 'Registration', subcategories: undefined };
      expect(retData.getData()).toStrictEqual(expectedData);
    });

    it('it should add new category', async () => {
      const expectedData = [
        {
          id: 'Category-0',
          category: 'Admission',
          subcategories: undefined,
        },
        { id: 'Category-1', category: 'Internship', subcategories: undefined },
        { id: 'Category-2', category: 'Registration', subcategories: undefined },
      ];

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(3);
      expect(categories.map((category) => category.getData())).toStrictEqual(expectedData);
    });
  });

  describe('updateCategory', () => {
    let retData;
    const updatedData = { id: 'Category-0', category: 'Registration' };

    beforeEach(async () => {
      retData = await categoryService.updateCategory(updatedData);
    });

    it('it should return updated category', async () => {
      const expectedData = {
        id: 'Category-0',
        category: 'Registration',
        subcategories: undefined,
      };
      expect(retData.getData()).toStrictEqual(expectedData);
    });

    it('it should update category', async () => {
      const expectedData = [
        {
          id: 'Category-0',
          category: 'Registration',
          subcategories: undefined,
        },
        { id: 'Category-1', category: 'Internship', subcategories: undefined },
      ];

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
      const expectedData = {
        id: 'Category-0',
        category: 'Admission',
        subcategories: undefined,
      };
      expect(retData.getData()).toStrictEqual(expectedData);
    });

    it('it should delete category', async () => {
      const expectedData = [{ id: 'Category-1', category: 'Internship', subcategories: undefined }];

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(1);
      expect(categories.map((category) => category.getData())).toStrictEqual(expectedData);
    });
  });
});
