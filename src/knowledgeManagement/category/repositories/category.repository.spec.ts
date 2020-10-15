import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getCustomRepository, Repository } from 'typeorm';
import { CategoryModule } from '../category.module';
import { CategoryRepository } from './category.repository';

describe('Categoy Repository', () => {
  let catRepos: CategoryRepository;

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [CategoryModule, TypeOrmModule.forRoot()],
    }).compile();
    catRepos = getCustomRepository(CategoryRepository);
  });

  it('should not throw error', async () => {
    expect(async () => {
      await catRepos.findAll();
    }).not.toThrowError();
  });
});
