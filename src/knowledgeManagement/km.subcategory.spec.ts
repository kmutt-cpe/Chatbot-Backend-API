import { SubcategoryService } from './km.subcategory.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { SubcategoryRepository } from './repositories/subcategory.repository';
import { Subcategory } from './entities/subcategory.entity';
import { Category as CategoryInterface } from './interfaces/category.interface';
import { Subcategory as SubcategoryInterface } from './interfaces/subcategory.interface';
import { MockBaseRepository } from '@BaseObject';
import { Category } from './entities/category.entity';
import { CategoryService } from './km.category.service';
import { CategoryRepository } from './repositories/category.repository';
import { UpdateSubcategoryDto } from './dto/subcategory.update.dto';

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
        subcategories: Promise.resolve([
          {
            id: 'Subcategory-0',
            subcategory: '2B-KMUTT',
          },
          {
            id: 'Subcategory-1',
            subcategory: 'Petch Prajohm',
          },
          {
            id: 'Subcategory-2',
            subcategory: 'Admission Recruitment',
          },
        ]),
      },
      { id: 'Category-1', category: 'internship', subcategories: Promise.resolve([]) },
    ];
    return categoryData;
  }
}

class MockSubcategoryRepository extends MockBaseRepository<Subcategory> {
  constructor() {
    super(Subcategory);
    this.mockData(MockSubcategoryRepository.getSeedData());
  }

  static getSeedData() {
    const subcategoryData: SubcategoryInterface[] = [
      {
        id: 'Subcategory-0',
        subcategory: '2B-KMUTT',
        category: Promise.resolve(MockCategoryRepository.getSeedData()[0]),
      },
      {
        id: 'Subcategory-1',
        subcategory: 'Petch Prajohm',
        category: Promise.resolve(MockCategoryRepository.getSeedData()[0]),
      },
      {
        id: 'Subcategory-2',
        subcategory: 'Admission Recruitment',
        category: Promise.resolve(MockCategoryRepository.getSeedData()[0]),
      },
    ];
    return subcategoryData;
  }
}

describe('SubcategoryService', () => {
  let subcategoryService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getCustomRepositoryToken(CategoryRepository),
          useClass: MockCategoryRepository,
        },
        SubcategoryService,
        {
          provide: getCustomRepositoryToken(SubcategoryRepository),
          useClass: MockSubcategoryRepository,
        },
      ],
    }).compile();
    subcategoryService = await moduleRef.resolve(SubcategoryService);
  });

  describe('getAllSubcategory', () => {
    it('it should return all subcategory', async () => {
      const expectedData = MockSubcategoryRepository.getSeedData().map((subcategory) => {
        subcategory.category = undefined;
        return subcategory;
      });
      const subcategories = await subcategoryService.getAllSubcategory();
      return expect(subcategories.map((subcategory) => subcategory.getData())).toStrictEqual(
        expectedData
      );
    });
  });

  describe('getSubcategoryById', () => {
    it('it should return the correctly subcategory', async () => {
      const expectedData = { ...MockSubcategoryRepository.getSeedData()[0], category: undefined };
      const subcategory = await subcategoryService.getSubcategoryById('Subcategory-0');
      return expect(subcategory.getData()).toStrictEqual(expectedData);
    });
  });

  describe('createSubcategory', () => {
    let retData;
    const inputData = { subcategory: 'รอบเรียนดี', categoryId: 'Category-0' };

    beforeEach(async () => {
      retData = await subcategoryService.createSubcategory(inputData);
    });

    it('it should return new subcategory', async () => {
      const expectedData = {
        id: 'Subcategory-3',
        subcategory: inputData.subcategory,
        category: undefined,
      };
      expect(retData.getData()).toStrictEqual(expectedData);
    });

    it('it should add new subcategory', async () => {
      const expectedData = MockSubcategoryRepository.getSeedData().map((subcategory) => {
        subcategory.category = undefined;
        return subcategory;
      });
      expectedData.push({
        id: 'Subcategory-3',
        subcategory: inputData.subcategory,
        category: undefined,
      });

      const subcategories = await subcategoryService.getAllSubcategory();
      expect(subcategories.length).toStrictEqual(4);
      expect(subcategories.map((subcategory) => subcategory.getData())).toStrictEqual(expectedData);
    });
  });

  describe('updateSubcategory', () => {
    let retData;
    const id = 'Subcategory-0';
    const updatedData: UpdateSubcategoryDto = {
      id: undefined,
      category: undefined,
      subcategory: '2B-KMUTT V.2',
      categoryId: 'Category-1',
    };

    beforeEach(async () => {
      retData = await subcategoryService.updateSubcategory(id, updatedData);
    });

    it('it should return updated subcategory', async () => {
      const expectedData = {
        ...MockSubcategoryRepository.getSeedData()[0],
        subcategory: updatedData.subcategory,
        category: undefined,
      };
      expect(retData.getData()).toStrictEqual(expectedData);
    });
    // todo: add check updated category (Note that mock repository should contains entity not dto)

    it('it should update subcategory', async () => {
      const expectedData = MockSubcategoryRepository.getSeedData().map((subcategory) => {
        subcategory.category = undefined;
        return subcategory;
      });
      expectedData[0].subcategory = updatedData.subcategory;

      const subcategories = await subcategoryService.getAllSubcategory();
      expect(subcategories.length).toStrictEqual(3);
      expect(subcategories.map((subcategory) => subcategory.getData())).toStrictEqual(expectedData);
    });
  });

  describe('deleteSubcategory', () => {
    let retData;
    const id = 'Subcategory-0';
    beforeEach(async () => {
      retData = await subcategoryService.deleteSubcategoryById(id);
    });

    it('it should return deleted subcategory', async () => {
      const expectedData = { ...MockSubcategoryRepository.getSeedData()[0], category: undefined };
      expect(retData.getData()).toStrictEqual(expectedData);
    });

    it('it should delete subcategory', async () => {
      const expectedData = MockSubcategoryRepository.getSeedData().map((subcategory) => {
        subcategory.category = undefined;
        return subcategory;
      });
      expectedData.shift();

      const subcategories = await subcategoryService.getAllSubcategory();
      expect(subcategories.length).toStrictEqual(2);
      expect(subcategories.map((subcategory) => subcategory.getData())).toStrictEqual(expectedData);
    });
  });
});
