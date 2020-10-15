import { FindConditions, Repository } from 'typeorm';
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
   * @param where Where condition follow the TypeORM doc
   * @returns an entity data or null
   */
  findById(id: string, where?: FindConditions<T>): Promise<T | null> {
    // todo: Implement find by id
    return null;
  }
}
