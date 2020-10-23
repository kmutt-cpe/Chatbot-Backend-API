import { Category as CategoryInterface } from '../interfaces/category.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';
import { ModelInput as ModelInputInterface } from '../interfaces/modelInput.interface';

@Entity()
export class ModelInput extends BaseEntity implements ModelInputInterface {
  @Column()
  question: string;

  @Column()
  inputTime: Date;

  @Column()
  outputTime: Date;

  @Column()
  status: string
}
