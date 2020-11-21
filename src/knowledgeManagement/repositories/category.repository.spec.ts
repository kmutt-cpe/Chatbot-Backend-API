import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getCustomRepository } from 'typeorm';
import { CategoryModule } from '../km.category.module';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from './category.repository';

describe('Categoy Repository', () => {
  let catRepos: CategoryRepository;

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [
        CategoryModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'cpechatbot',
          password: 'chitchat',
          database: 'cpechatbotdb',
          entities: [Category],
          synchronize: true,
        }),
      ],
    }).compile();
    catRepos = getCustomRepository(CategoryRepository);
  });

  it('should not throw error', async () => {
    expect(async () => {
      await catRepos.findAll();
    }).not.toThrowError();
  });
});
