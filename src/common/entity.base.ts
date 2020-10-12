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
  setDataValue(key: string, value: any): void {
    if (key !== 'id') {
      this[key] = value;
    }
    // todo: Throw Error if key is id
  }

  /**
   * Set all value inside object to the entity
   * @param {Object} props
   */
  setDataValues(props): void {
    forEach(props, (value, key) => this.setDataValue(key, value));
  }

  /**
   * Get all data values.
   * @return all value inside this class.
   */
  getData() {
    const retData = {};
    forEach(this, (value, key) => (retData[key] = value));
    return retData;
  }

  /**
   * Convert dao from db to new Entity.
   * @abstract
   * @return {Entity}
   */
  static fromRow(rowData) {
    // const entity = new BaseEntity();
    // entity.dataValues = rowData.toJSON();
    // return entity;
  }

  /**
   * Get the data that changed
   * @return {object} Property with value that changed.
   */
  public getChangedData() {
    // return this.changedDataValues;
  }

  /**
   * @private Check that the value in key of this entity will be change or not.
   *
   * @param {string} [key] key to check
   * @param {any} [value] value to change
   *
   * @returns {boolean}
   */
  public isValueChange(key, value) {
    // const originalValue = this.dataValues[key];
    // if (isEqual(value, originalValue)) return false;
    // return true;
  }
}
