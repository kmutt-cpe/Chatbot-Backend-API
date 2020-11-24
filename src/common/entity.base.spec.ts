import { BaseEntity } from './entity.base';

/**
 * Temporary Entity class for test the BaseEntity.
 */
class Entity extends BaseEntity {
  private entityData1 = 'data1';
  private entityData2 = 'data2';
  private entityData3 = 'data3';
  getData() {
    return { ...this };
  }
}

describe('BaseEntity', () => {
  let entity: Entity;

  beforeEach(async () => {
    entity = new Entity();
  });

  describe('setDataValue', () => {
    beforeEach(async () => {
      entity.setDataValue('id', '1');
      entity.setDataValue('entityData1', 'data4');
    });
    it(`should set data correctly`, () => {
      const expectedData = {
        entityData1: 'data4',
        entityData2: 'data2',
        entityData3: 'data3',
      };
      expect(entity.getData()).toStrictEqual(expectedData);
    });
    it(`shouldn't set id`, () => {
      expect(entity.getData().id).toBeUndefined();
    });
  });

  describe('setDataValues', () => {
    beforeEach(async () => {
      entity.setDataValues({
        id: 1,
        entityData1: 'data4',
        entityData2: 'data5',
        entityData3: 'data6',
      });
    });
    it(`should set data correctly`, () => {
      const expectedData = {
        entityData1: 'data4',
        entityData2: 'data5',
        entityData3: 'data6',
      };
      expect(entity.getData()).toStrictEqual(expectedData);
    });
  });
});
