import { FindOneOptions, Repository, SaveOptions } from 'typeorm';
import { BaseEntity } from './entity.base';
import { BaseInterface } from './interface.base';
/**
 * Base repository that provide only necessary method to CRUD the database.
 * (Custom repository from TypeORM)
 */
export class BaseRepository<T> extends Repository<T> {
  /**
   * Get all data in database
   * @returns Return all entity in database
   */
  findAll(): Promise<T[]> {
    return this.find();
  }

  /**
   * Find a row data from database by Id
   * @param id
   * @param options Where condition follow the TypeORM doc
   * @returns an entity data or null
   */
  findById(id: string, options?: FindOneOptions<T>): Promise<T | null> {
    return this.findOne(id, options);
  }
}

export abstract class MockBaseRepository<T extends BaseEntity> {
  private counter = 0;
  private data = [];
  private EntityName;

  constructor(private Entity: new () => T) {
    this.EntityName = Entity.name;
  }

  mockData(data: any[]): void {
    data.map((item) => {
      const entity = this.create();
      entity.setDataValues(item);
      this.save(entity);
    });
  }

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
