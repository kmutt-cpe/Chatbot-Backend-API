import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { SubcategoryRepository } from '../subcategory/domain/subcategory.repository';
import { Category as CategoryInterface } from '../category/category.interface';
import { Subcategory as SubcategoryInterface } from '../subcategory/subcategory.interface';
import { User as UserInterface } from '../user/user.interface';
import { FAQ as FAQInterface } from '../faq/faq.interface';
import { CategoryService } from '../category/category.service';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { CategoryRepository } from '../category/domain/category.repository';
import { CategorySeeder } from '../../spec/seeder/category.seeder';
import { MockCategoryRepository } from '../../spec/mockRepository/mockCategoryRepository.mock';
import { SubcategorySeeder } from '../../spec/seeder/subcategory.seeder';
import { MockSubcategoryRepository } from '../../spec/mockRepository/mockSubcategoryRepository.mock';
import { UserSeeder } from '../../spec/seeder/user.seeder';
import { MockUserRepository } from '../../spec/mockRepository/mockUserRepository.mock';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/domain/user.repository';
import { UserRole } from '../user/domain/userRole.constant';
import { MockFAQRepository } from '../../spec/mockRepository/mockFaqRepository.mock';
import { FAQService } from '../faq/faq.service';
import { FAQSeeder } from '../../spec/seeder/faq.seeder';
import { FAQRepository } from '../faq/domain/faq.repository';
import { FAQDto } from '../faq/dto/faq.dto';
import { UpdateFAQDto } from './dto/faq.update.dto';
import { CreateFAQDto } from './dto/faq.create.dto';

describe('FAQService', () => {
  let faqService;

  beforeEach(async () => {
    // Set up category
    const categorySeeder: CategorySeeder = new CategorySeeder();
    const categoriesData: CategoryInterface[] = categorySeeder.getData();
    const mockCategoryRepository: MockCategoryRepository = new MockCategoryRepository();
    mockCategoryRepository.setup(categoriesData);

    // Setup subcategory
    const subcategorySeeder: SubcategorySeeder = new SubcategorySeeder();
    const subcategoriesData: SubcategoryInterface[] = subcategorySeeder.getData();
    const mockSubcategoryRepository: MockSubcategoryRepository = new MockSubcategoryRepository();
    mockSubcategoryRepository.setup(subcategoriesData);

    // Setup user
    const userSeeder: UserSeeder = new UserSeeder();
    const usersData: UserInterface[] = userSeeder.getData();
    const mockUserRepository: MockUserRepository = new MockUserRepository();
    mockUserRepository.setup(usersData);

    // Setup faq
    const faqSeeder: FAQSeeder = new FAQSeeder();
    const faqsData: FAQInterface[] = faqSeeder.getData();
    const mockFAQRepository: MockFAQRepository = new MockFAQRepository();
    mockFAQRepository.setup(faqsData);

    // Connect Relation
    await mockCategoryRepository.mockSubcategories(mockSubcategoryRepository);
    await mockSubcategoryRepository.mockCategories(mockCategoryRepository);
    await mockFAQRepository.mockSubcategories(mockSubcategoryRepository);
    await mockFAQRepository.mockLastEditors(mockUserRepository);

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
        {
          provide: getCustomRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
        {
          provide: getCustomRepositoryToken(FAQRepository),
          useValue: mockFAQRepository,
        },
        CategoryService,
        SubcategoryService,
        UserService,
        FAQService,
      ],
    }).compile();
    faqService = await moduleRef.resolve(FAQService);
  });

  describe('getAllFAQ', () => {
    it('it should return all faq', async () => {
      const expectedData: FAQDto[] = [
        {
          id: 'FAQ-0',
          question: 'question1',
          answer: 'answer1',
          subcategory: {
            id: 'Subcategory-0',
            subcategory: '2B-KMUTT',
            category: undefined,
          },
          category: {
            id: 'Category-0',
            category: 'Admission',
            subcategories: undefined,
          },
          lastEditor: {
            id: 'User-0',
            username: 'username1',
            password: undefined,
            name: 'name1',
            role: UserRole.ADMIN,
          },
        },
        {
          id: 'FAQ-1',
          question: 'question2',
          answer: 'answer2',
          subcategory: {
            id: 'Subcategory-0',
            subcategory: '2B-KMUTT',
            category: undefined,
          },
          category: {
            id: 'Category-0',
            category: 'Admission',
            subcategories: undefined,
          },
          lastEditor: {
            id: 'User-0',
            username: 'username1',
            password: undefined,
            name: 'name1',
            role: UserRole.ADMIN,
          },
        },
      ];
      const retData = await faqService.getAllFAQ();
      return expect(retData).toStrictEqual(expectedData);
    });
  });

  describe('getFAQById', () => {
    it('it should return the correctly faq', async () => {
      const expectedData: FAQDto = {
        id: 'FAQ-0',
        question: 'question1',
        answer: 'answer1',
        subcategory: {
          id: 'Subcategory-0',
          subcategory: '2B-KMUTT',
          category: undefined,
        },
        category: {
          id: 'Category-0',
          category: 'Admission',
          subcategories: undefined,
        },
        lastEditor: {
          id: 'User-0',
          username: 'username1',
          password: undefined,
          name: 'name1',
          role: UserRole.ADMIN,
        },
      };
      const retData = await faqService.getFAQById('FAQ-0');
      return expect(retData).toStrictEqual(expectedData);
    });
  });

  describe('createFAQ', () => {
    let retData;
    const inputData: CreateFAQDto = {
      id: undefined,
      subcategory: undefined,
      lastEditor: undefined,
      question: 'question3',
      answer: 'answer3',
      subcategoryId: 'Subcategory-1',
      lastEditorId: 'User-1',
    };

    beforeEach(async () => {
      retData = await faqService.createFAQ(inputData);
    });

    it('it should return new faq', async () => {
      const expectedData: FAQDto = {
        id: 'FAQ-2',
        question: 'question3',
        answer: 'answer3',
        subcategory: {
          id: 'Subcategory-1',
          subcategory: 'Petch Prajohm',
          category: undefined,
        },
        category: {
          id: 'Category-0',
          category: 'Admission',
          subcategories: undefined,
        },
        lastEditor: {
          id: 'User-1',
          username: 'username2',
          password: undefined,
          name: 'name2',
          role: UserRole.ADMIN,
        },
      };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should add new faq in db', async () => {
      const expectedData = [
        {
          id: 'FAQ-0',
          question: 'question1',
          answer: 'answer1',
          subcategory: {
            id: 'Subcategory-0',
            subcategory: '2B-KMUTT',
            category: undefined,
          },
          category: {
            id: 'Category-0',
            category: 'Admission',
            subcategories: undefined,
          },
          lastEditor: {
            id: 'User-0',
            username: 'username1',
            password: undefined,
            name: 'name1',
            role: UserRole.ADMIN,
          },
        },
        {
          id: 'FAQ-1',
          question: 'question2',
          answer: 'answer2',
          subcategory: {
            id: 'Subcategory-0',
            subcategory: '2B-KMUTT',
            category: undefined,
          },
          category: {
            id: 'Category-0',
            category: 'Admission',
            subcategories: undefined,
          },
          lastEditor: {
            id: 'User-0',
            username: 'username1',
            password: undefined,
            name: 'name1',
            role: UserRole.ADMIN,
          },
        },
        {
          id: 'FAQ-2',
          question: 'question3',
          answer: 'answer3',
          subcategory: {
            id: 'Subcategory-1',
            subcategory: 'Petch Prajohm',
            category: undefined,
          },
          category: {
            id: 'Category-0',
            category: 'Admission',
            subcategories: undefined,
          },
          lastEditor: {
            id: 'User-1',
            username: 'username2',
            password: undefined,
            name: 'name2',
            role: UserRole.ADMIN,
          },
        },
      ];

      const retData = await faqService.getAllFAQ();
      expect(retData.length).toStrictEqual(3);
      expect(retData).toStrictEqual(expectedData);
    });
  });

  describe('updateFAQ', () => {
    let retData;
    const updatedData: UpdateFAQDto = {
      id: 'FAQ-0',
      subcategory: undefined,
      lastEditor: undefined,
      question: 'question1update',
      answer: 'answer1update',
      subcategoryId: 'Subcategory-1',
      lastEditorId: 'User-1',
    };

    beforeEach(async () => {
      retData = await faqService.updateFAQ(updatedData);
    });

    it('it should return updated faq', async () => {
      const expectedData = {
        id: 'FAQ-0',
        question: 'question1update',
        answer: 'answer1update',
        subcategory: {
          id: 'Subcategory-1',
          subcategory: 'Petch Prajohm',
          category: undefined,
        },
        category: {
          id: 'Category-0',
          category: 'Admission',
          subcategories: undefined,
        },
        lastEditor: {
          id: 'User-1',
          username: 'username2',
          password: undefined,
          name: 'name2',
          role: UserRole.ADMIN,
        },
      };
      expect(retData).toStrictEqual(expectedData);
    });
    it('it should update faq in db', async () => {
      const expectedData = [
        {
          id: 'FAQ-0',
          question: 'question1update',
          answer: 'answer1update',
          subcategory: {
            id: 'Subcategory-1',
            subcategory: 'Petch Prajohm',
            category: undefined,
          },
          category: {
            id: 'Category-0',
            category: 'Admission',
            subcategories: undefined,
          },
          lastEditor: {
            id: 'User-1',
            username: 'username2',
            password: undefined,
            name: 'name2',
            role: UserRole.ADMIN,
          },
        },
        {
          id: 'FAQ-1',
          question: 'question2',
          answer: 'answer2',
          subcategory: {
            id: 'Subcategory-0',
            subcategory: '2B-KMUTT',
            category: undefined,
          },
          category: {
            id: 'Category-0',
            category: 'Admission',
            subcategories: undefined,
          },
          lastEditor: {
            id: 'User-0',
            username: 'username1',
            password: undefined,
            name: 'name1',
            role: UserRole.ADMIN,
          },
        },
      ];

      const retData = await faqService.getAllFAQ();
      expect(retData.length).toStrictEqual(2);
      expect(retData).toStrictEqual(expectedData);
    });
  });

  describe('deleteFAQ', () => {
    let retData;
    const id = 'FAQ-0';
    beforeEach(async () => {
      retData = await faqService.deleteFAQById(id);
    });

    it('it should return deleted faq', async () => {
      const expectedData = {
        id: 'FAQ-0',
        question: 'question1',
        answer: 'answer1',
        subcategory: {
          id: 'Subcategory-0',
          subcategory: '2B-KMUTT',
          category: undefined,
        },
        category: {
          id: 'Category-0',
          category: 'Admission',
          subcategories: undefined,
        },
        lastEditor: {
          id: 'User-0',
          username: 'username1',
          password: undefined,
          name: 'name1',
          role: UserRole.ADMIN,
        },
      };
      expect(retData).toStrictEqual(expectedData);
    });

    it('it should delete faq in db', async () => {
      const expectedData = [
        {
          id: 'FAQ-1',
          question: 'question2',
          answer: 'answer2',
          subcategory: {
            id: 'Subcategory-0',
            subcategory: '2B-KMUTT',
            category: undefined,
          },
          category: {
            id: 'Category-0',
            category: 'Admission',
            subcategories: undefined,
          },
          lastEditor: {
            id: 'User-0',
            username: 'username1',
            password: undefined,
            name: 'name1',
            role: UserRole.ADMIN,
          },
        },
      ];

      const retData = await faqService.getAllFAQ();
      expect(retData.length).toStrictEqual(1);
      expect(retData).toStrictEqual(expectedData);
    });
  });
});
