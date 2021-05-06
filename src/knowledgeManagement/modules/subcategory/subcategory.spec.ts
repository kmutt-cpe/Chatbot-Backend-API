import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { SubcategoryRepository } from './domain/subcategory.repository';
import { Category as CategoryInterface } from '../category/category.interface';
import { Subcategory as SubcategoryInterface } from './subcategory.interface';
import { CategoryService } from '../category/category.service';
import { SubcategoryService } from './subcategory.service';
import { CategoryRepository } from '../category/domain/category.repository';
import { UpdateSubcategoryDto } from './dto/subcategory.update.dto';
import { CategorySeeder } from '../../spec/seeder/category.seeder';
import { MockCategoryRepository } from '../../spec/mockRepository/mockCategoryRepository.mock';
import { SubcategorySeeder } from '../../spec/seeder/subcategory.seeder';
import { MockSubcategoryRepository } from '../../spec/mockRepository/mockSubcategoryRepository.mock';
import { SubcategoryDto } from './dto/subcategory.dto';
import { CreateSubcategoryDto } from './dto/subcategory.create.dto';
import { CategoryDto } from '../category/dto/category.dto';

describe('SubcategoryService', () => {
  let subcategoryService;

  beforeEach(async () => {
    // Set up category
    const categorySeeder: CategorySeeder = new CategorySeeder();
    const categoryData: CategoryInterface[] = categorySeeder.getData();
    const mockCategoryRepository: MockCategoryRepository = new MockCategoryRepository();
    mockCategoryRepository.setup(categoryData);

    // Setup subcategory
    const subcategorySeeder: SubcategorySeeder = new SubcategorySeeder();
    const subcategoryData: SubcategoryInterface[] = subcategorySeeder.getData();
    const mockSubcategoryRepository: MockSubcategoryRepository = new MockSubcategoryRepository();
    mockSubcategoryRepository.setup(subcategoryData);

    // Connect Relation
    await mockCategoryRepository.mockSubcategories(mockSubcategoryRepository);
    await mockSubcategoryRepository.mockCategories(mockCategoryRepository);

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getCustomRepositoryToken(CategoryRepository),
          useValue: mockCategoryRepository,
        },
        {
          provide: getCustomRepositoryToken(SubcategoryRepository),
          useValue: mockSubcategoryRepository,
        },
        CategoryService,
        SubcategoryService,
      ],
    }).compile();
    subcategoryService = await moduleRef.resolve(SubcategoryService);
  });

  describe('getAllSubcategory', () => {
    it('it should return all subcategory', async () => {
      const expectedData: SubcategoryDto[] = [
        {
          id: 'Subcategory-0',
          subcategory: '2B-KMUTT',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
        {
          id: 'Subcategory-1',
          subcategory: 'Petch Prajohm',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
        {
          id: 'Subcategory-2',
          subcategory: 'Admission Recruitment',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
      ];
      const subcategories = await subcategoryService.getAllSubcategory();
      return expect(subcategories).toStrictEqual(expectedData);
    });
  });

  describe('getSubcategoryById', () => {
    it('it should return the correctly subcategory', async () => {
      const expectedData: SubcategoryDto = {
        id: 'Subcategory-0',
        subcategory: '2B-KMUTT',
        category: {
          category: 'Admission',
          id: 'Category-0',
          subcategories: undefined,
        },
      };
      const subcategory = await subcategoryService.getSubcategoryById('Subcategory-0');
      return expect(subcategory).toStrictEqual(expectedData);
    });
  });
  describe('getSubcategoryByCategoryId', () => {
    it('it should return the correctly subcategory', async () => {
      const expectedData: SubcategoryDto = {
        id: 'Subcategory-0',
        subcategory: '2B-KMUTT',
        category: {
          category: 'Admission',
          id: 'Category-0',
          subcategories: undefined,
        },
      };
      const subcategory = await subcategoryService.getSubcategoryById('Subcategory-0');
      return expect(subcategory).toStrictEqual(expectedData);
    });
  });

  describe('createSubcategory', () => {
    let retData;
    const inputData: CreateSubcategoryDto = {
      id: undefined,
      category: undefined,
      subcategory: 'รอบเรียนดี',
      categoryId: 'Category-1',
    };

    beforeEach(async () => {
      retData = await subcategoryService.createSubcategory(inputData);
    });

    it('it should return new subcategory', async () => {
      const expectedData: SubcategoryDto = {
        id: 'Subcategory-3',
        subcategory: 'รอบเรียนดี',
        category: { id: 'Category-1', category: 'Internship', subcategories: undefined },
      };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should add new subcategory', async () => {
      const expectedData: SubcategoryDto[] = [
        {
          id: 'Subcategory-0',
          subcategory: '2B-KMUTT',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
        {
          id: 'Subcategory-1',
          subcategory: 'Petch Prajohm',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
        {
          id: 'Subcategory-2',
          subcategory: 'Admission Recruitment',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
        {
          id: 'Subcategory-3',
          subcategory: 'รอบเรียนดี',
          category: { id: 'Category-1', category: 'Internship', subcategories: undefined },
        },
      ];

      const subcategories = await subcategoryService.getAllSubcategory();
      expect(subcategories.length).toStrictEqual(4);
      expect(subcategories).toStrictEqual(expectedData);
    });
  });

  describe('updateSubcategory', () => {
    let retData;
    const updatedData: UpdateSubcategoryDto = {
      id: 'Subcategory-0',
      category: undefined,
      subcategory: '2B-KMUTT V.2',
      categoryId: 'Category-1',
    };

    beforeEach(async () => {
      retData = await subcategoryService.updateSubcategory(updatedData);
    });

    it('it should return updated subcategory', async () => {
      const expectedData: SubcategoryDto = {
        id: 'Subcategory-0',
        subcategory: '2B-KMUTT V.2',
        category: {
          id: 'Category-1',
          category: 'Internship',
          subcategories: undefined,
        },
      };
      expect(retData).toStrictEqual(expectedData);
    });
    it('it should update subcategory and category in database', async () => {
      const expectedData: SubcategoryDto[] = [
        {
          id: 'Subcategory-0',
          subcategory: '2B-KMUTT V.2',
          category: {
            id: 'Category-1',
            category: 'Internship',
            subcategories: undefined,
          },
        },
        {
          id: 'Subcategory-1',
          subcategory: 'Petch Prajohm',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
        {
          id: 'Subcategory-2',
          subcategory: 'Admission Recruitment',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
      ];

      const subcategories = await subcategoryService.getAllSubcategory();
      expect(subcategories.length).toStrictEqual(3);
      expect(subcategories).toStrictEqual(expectedData);
    });
  });

  describe('deleteSubcategory', () => {
    let retData;
    const id = 'Subcategory-0';
    beforeEach(async () => {
      retData = await subcategoryService.deleteSubcategoryById(id);
    });

    it('it should return deleted subcategory', async () => {
      const expectedData: SubcategoryDto = {
        id: 'Subcategory-0',
        subcategory: '2B-KMUTT',
        category: {
          category: 'Admission',
          id: 'Category-0',
          subcategories: undefined,
        },
      };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should delete subcategory in database', async () => {
      const expectedData: SubcategoryDto[] = [
        {
          id: 'Subcategory-1',
          subcategory: 'Petch Prajohm',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
        {
          id: 'Subcategory-2',
          subcategory: 'Admission Recruitment',
          category: {
            category: 'Admission',
            id: 'Category-0',
            subcategories: undefined,
          },
        },
      ];

      const subcategories = await subcategoryService.getAllSubcategory();
      expect(subcategories.length).toStrictEqual(2);
      expect(subcategories).toStrictEqual(expectedData);
    });
  });
});
