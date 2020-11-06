import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';
import { PredictTask as PredictTaskInterface } from '../interfaces/predictTask.interface';

@Entity()
export class PredictTask extends BaseEntity implements PredictTaskInterface {
  @Column()
  question: string;

  @Column()
  inputTime: Date;

  @Column()
  outputTime: Date;

  @Column()
  status: string;
}
