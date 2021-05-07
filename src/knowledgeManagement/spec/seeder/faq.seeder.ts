import { BaseSeeder } from '@BaseObject';
import { FAQ as FAQInterface } from '../../modules/faq/faq.interface';
import { SubcategorySeeder } from './subcategory.seeder';
import { UserSeeder } from './user.seeder';

export class FAQSeeder extends BaseSeeder<FAQInterface> {
  getData(): FAQInterface[] {
    const subcategorySeeder = new SubcategorySeeder();
    const subcategory = subcategorySeeder.getData()[0];

    const userSeeder = new UserSeeder();
    const user = userSeeder.getData()[0];

    const users: FAQInterface[] = [
      {
        id: 'FAQ-0',
        question: 'question1',
        answer: 'answer1',
        subcategory: subcategory,
        lastEditor: user,
        updatedDate: new Date('2021-05-03'),
      },
      {
        id: 'FAQ-1',
        question: 'question2',
        answer: 'answer2',
        subcategory: subcategory,
        lastEditor: user,
        updatedDate: new Date('2021-05-02'),
      },
    ];
    return users;
  }
}
