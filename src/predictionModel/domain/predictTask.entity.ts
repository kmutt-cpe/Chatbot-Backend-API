import { BaseEntity } from '@BaseObject';
import { Column, Entity } from 'typeorm';
import { PredictTask as PredictTaskInterface } from '../predictTask.interface';
import { PredictTaskDto } from 'predictionModel/dto/predictTask.dto';

export enum TaskStatus {
  NEW = 'NEW',
  IN_PROCESS = 'IN_PROCESS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity()
export class PredictTask extends BaseEntity implements PredictTaskInterface {
  @Column()
  inputQuestion: string;

  @Column({ nullable: true })
  predictedQuestion: string = null;

  @Column({ nullable: true })
  predictedQuestionId: string = null;

  @Column({ nullable: true })
  predictedAnswer: string = null;

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

  getData(): PredictTaskDto {
    return {
      id: this.id,
      inputQuestion: this.inputQuestion,
      predictedQuestion: this.predictedQuestion,
      predictedQuestionId: this.predictedQuestionId,
      predictedAnswer: this.predictedAnswer,
      inputTime: this.inputTime,
      outputTime: this.outputTime,
      status: this.status,
    };
  }
}
