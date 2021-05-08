import { BaseEntity } from '@BaseObject';
import { Column, Entity } from 'typeorm';
import { PredictTask as PredictTaskInterface } from '../predictTask.interface';
import { PredictTaskDto } from 'predictionModel/dto/predictTask.dto';

export enum TaskStatus {
  NEW = 'NEW',
  IN_PROCESS_CATEGORY = 'IN_PROCESS_CATEGORY',
  IN_PROCESS_QUESTION = 'IN_PROCESS_QUESTION',
  SUCCESS_CATEGORY = 'SUCCESS_CATEGORY',
  SUCCESS_QUESTION = 'SUCCESS_QUESTION',
  FAILED_CATEGORY = 'FAILED_CATEGORY',
  FAILED_QUESTION = 'FAILED_QUESTION',
  CANNOT_FIND_QUSTION = 'CANNOT_FIND_QUSTION',
}

@Entity()
export class PredictTask extends BaseEntity implements PredictTaskInterface {
  @Column({ nullable: true })
  predictedCategory: string = null;

  @Column({ type: 'datetime', nullable: true })
  inputTimeCategory: Date = null;

  @Column({ type: 'datetime', nullable: true })
  outputTimeCategory: Date = null;

  @Column({ type: 'numeric' })
  categoryAccuracy = -1;

  @Column()
  inputQuestion: string;

  @Column({ nullable: true })
  predictedQuestion: string = null;

  @Column({ nullable: true })
  predictedQuestionId: string = null;

  @Column({ nullable: true })
  predictedAnswer: string = null;

  @Column({ type: 'numeric' })
  questionAccuracy = -1;

  @Column({ type: 'datetime', nullable: true })
  inputTimeQuestion: Date = null;

  @Column({ type: 'datetime', nullable: true })
  outputTimeQuestion: Date = null;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.NEW,
  })
  status: TaskStatus = TaskStatus.NEW;

  @Column({ nullable: true })
  tag: string = null;

  getData(): PredictTaskDto {
    return {
      id: this.id,
      predictedCategory: this.predictedCategory,
      categoryAccuracy: this.categoryAccuracy,
      inputTimeCategory: this.inputTimeCategory,
      outputTimeCategory: this.outputTimeCategory,
      inputQuestion: this.inputQuestion,
      predictedQuestion: this.predictedQuestionId,
      predictedQuestionId: this.predictedQuestionId,
      predictedAnswer: this.predictedAnswer,
      questionAccuracy: this.questionAccuracy,
      inputTimeQuestion: this.inputTimeQuestion,
      outputTimeQuestion: this.outputTimeQuestion,
      status: this.status,
    };
  }
}
