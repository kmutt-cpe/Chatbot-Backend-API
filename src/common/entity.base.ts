import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { isEqual, forEach } from 'lodash';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
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
   * Get all data values.
   * @return all value inside this class.
   */
  public getData(): any {
    const retData = {};
    forEach(this, (value, key) => (retData[key] = value));
    return retData;
  }

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
