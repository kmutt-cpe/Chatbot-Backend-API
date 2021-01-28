import { MockBaseRepository } from '@BaseObject';
import { FAQ } from '../../modules/faq/domain/faq.entity';
import { FAQ as FAQInterface } from '../../modules/faq/faq.interface';
import { MockSubcategoryRepository } from './mockSubcategoryRepository.mock';
import { MockUserRepository } from './mockUserRepository.mock';

export class MockFAQRepository extends MockBaseRepository<FAQ> {
  private faqsData = [];
  constructor() {
    super(FAQ);
  }

  setup(data: FAQInterface[]): void {
    this.mockData(data);
    this.faqsData = [...data];
  }

  async mockSubcategories(subcategoryRepository: MockSubcategoryRepository): Promise<void> {
    if (this.data === []) throw new Error(`Need to set up ${this.EntityName}Repository first`);
    for (const faqData of this.faqsData) {
      const subcategoryId: string = faqData.subcategory.id;
      const subcategory = await subcategoryRepository.findById(subcategoryId);
      const faq = await this.findById(faqData.id);
      faq.subcategory = Promise.resolve(subcategory);
    }
  }

  async mockLastEditors(userRepository: MockUserRepository): Promise<void> {
    if (this.data === []) throw new Error(`Need to set up ${this.EntityName}Repository first`);
    for (const faqData of this.faqsData) {
      const userId: string = faqData.lastEditor.id;
      const user = await userRepository.findById(userId);
      const faq = await this.findById(faqData.id);
      faq.lastEditor = Promise.resolve(user);
    }
  }
}
