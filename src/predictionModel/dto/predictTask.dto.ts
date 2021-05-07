import { PredictTask as PredictTaskInterface } from '../predictTask.interface';

export class PredictTaskDto implements PredictTaskInterface {
  id: string;
  inputQuestion: string;
  predictedQuestion: string;
  predictedQuestionId: string;
  predictedAnswer: string;
  inputTime: Date;
  outputTime: Date;
  status: string;
}
