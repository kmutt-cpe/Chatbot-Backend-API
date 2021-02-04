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
          subcategories: [],
        },
        { id: 'Category-1', category: 'Internship', subcategories: [] },
      ];
      const categories = await categoryService.getAllCategory();
      return expect(categories).toStrictEqual(expectedData);
    });
  });

  describe('getCategoryById', () => {
    it('it should return the correctly category', async () => {
      const expectedData = {
        id: 'Category-0',
        category: 'Admission',
        subcategories: [],
      };
      const category = await categoryService.getCategoryById('Category-0');
      return expect(category).toStrictEqual(expectedData);
    });
  });

  describe('createCategory', () => {
    let retData;
    const inputData = { category: 'Registration' };

    beforeEach(async () => {
      retData = await categoryService.createCategory(inputData);
    });

    it('it should return new category', async () => {
      const expectedData = { id: 'Category-2', category: 'Registration', subcategories: [] };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should add new category', async () => {
      const expectedData = [
        {
          id: 'Category-0',
          category: 'Admission',
          subcategories: [],
        },
        { id: 'Category-1', category: 'Internship', subcategories: [] },
        { id: 'Category-2', category: 'Registration', subcategories: [] },
      ];

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(3);
      expect(categories).toStrictEqual(expectedData);
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
        subcategories: [],
      };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should update category', async () => {
      const expectedData = [
        {
          id: 'Category-0',
          category: 'Registration',
          subcategories: [],
        },
        { id: 'Category-1', category: 'Internship', subcategories: [] },
      ];

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
      const expectedData = {
        id: 'Category-0',
        category: 'Admission',
        subcategories: [],
      };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should delete category', async () => {
      const expectedData = [{ id: 'Category-1', category: 'Internship', subcategories: [] }];

      const categories = await categoryService.getAllCategory();
      expect(categories.length).toStrictEqual(1);
      expect(categories).toStrictEqual(expectedData);
    });
  });
});
