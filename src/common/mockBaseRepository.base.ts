import { BaseEntity } from './entity.base';
import { FindOneOptions, SaveOptions } from 'typeorm';

/**
 * Mock up repository class.
 */
export abstract class MockBaseRepository<T extends BaseEntity> {
  protected counter = 0;
  protected data = [];
  protected EntityName;

  constructor(private Entity: new () => T) {
    this.EntityName = Entity.name;
  }

  abstract setup(data: any[]): void;

  /**
   * Mock up data in database for repository.
   * @param data Data that we want to mock up
   */
  mockData(data: any[]): void {
    data.forEach((item) => {
      const entity = this.create();
      entity.setDataValues(item);
      this.save(entity);
    });
  }

  /**
   * Create entity object
   * @return Entity object
   */
  create(): T {
    const entity: T = new this.Entity();
    entity.id = `${this.EntityName}-${this.counter}`;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();
    this.counter += 1;
    return entity;
  }

  findAll(): Promise<T[]> {
    return Promise.resolve(this.data);
  }

  findById(id: string, options?: FindOneOptions<T>): Promise<T | null> {
    return Promise.resolve(this.data.find((item) => item.id === id));
  }

  save<T extends BaseEntity>(entity: T, options?: SaveOptions): Promise<T | T[]> {
    const pos = this.data.findIndex((item) => item.id === entity.id);
    if (pos === -1) this.data.push(entity);
    else this.data[pos] = entity;
    return Promise.resolve(entity);
  }

  softRemove<T extends BaseEntity>(entity: T, options?: SaveOptions): Promise<T | T[]> {
    const data = this.data.find((item) => item.id === entity.id);
    this.data = this.data.filter((item) => item !== entity);
    return Promise.resolve(data);
  }
}
