import { PredictTask as PredictTaskInterface } from '../predictTask.interface';

export class PredictTaskDto implements PredictTaskInterface {
  id: string;
  predictedCategory: string;
  categoryAccuracy: number;
  inputTimeCategory: Date;
  outputTimeCategory: Date;

  inputQuestion: string;
  predictedQuestion: string;
  predictedQuestionId: string;
  predictedAnswer: string;
  questionAccuracy: number;
  inputTimeQuestion: Date;
  outputTimeQuestion: Date;
  status: string;
}
