import { BaseInterface } from '@BaseObject';

export interface PredictTask extends BaseInterface {
  inputQuestion: string;

  predictedCategory: string;
  categoryAccuracy: number;
  inputTimeCategory: Date;
  outputTimeCategory: Date;

  predictedQuestion: string;
  predictedQuestionId: string;
  questionAccuracy: number;
  predictedAnswer: string;
  inputTimeQuestion: Date;
  outputTimeQuestion: Date;
  status: string;
}
