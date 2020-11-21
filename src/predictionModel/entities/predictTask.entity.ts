import { BaseEntity } from '@BaseObject';
import { Column, Entity } from 'typeorm';
import { PredictTask as PredictTaskInterface } from '../interfaces/predictTask.interface';

export enum TaskStatus {
  NEW = 'NEW',
  IN_PROCESS = 'IN_PROCESS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity()
export class PredictTask extends BaseEntity implements PredictTaskInterface {
  @Column({ type: 'varchar' })
  inputQuestion: string;

  @Column({ type: 'varchar', nullable: true })
  predictedQuestion: string = null;

  @Column({ type: 'datetime', nullable: true })
  inputTime: Date = null;

  @Column({ type: 'datetime', nullable: true })
  outputTime: Date = null;

  @Column({
    type: 'enum',
    enum: ['NEW', 'IN_PROCESS', 'SUCCESS', 'FAILED'],
    default: TaskStatus.NEW,
  })
  status: TaskStatus = TaskStatus.NEW;
}
