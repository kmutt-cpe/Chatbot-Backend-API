/**
 * Base repository that provide only necessary method to CRUD the database.
 * (Custom repository from TypeORM)
 */
export abstract class BaseSeeder<T> {
  /**
   * Get the initial data of that class
   */
  abstract getData(): T[];
}
