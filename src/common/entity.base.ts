import { forEach } from 'lodash';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Base entity that provide necessary property and method to use.
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;

  /**
   * Set value to the key of this entity.
   * @param {string} key
   * @param {any} value
   */
  public setDataValue(key: string, value: any): void {
    if (key !== 'id') {
      this[key] = value;
    }
    // todo: Throw Error if key is id
  }

  /**
   * Set all value inside object to the entity
   * @param {Object} props
   */
  public setDataValues(props: any): void {
    forEach(props, (value, key) => this.setDataValue(key, value));
  }

  /**
   * Get data object follow dto.
   */
  public abstract getData();

  /**
   * Get the data that changed
   * @return {object} Property with value that changed.
   */
  public getChangedData(): void {
    // todo: Add changed data to improve performance.
  }

  /**
   * @private Check that the value in key of this entity will be change or not.
   *
   * @param {string} [key] key to check
   * @param {any} [value] value to change
   *
   * @returns {boolean}
   */
  public isValueChange(key, value): void {
    // todo: Add changed data to improve performance.
  }
}
