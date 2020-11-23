import { BaseInterface } from '@BaseObject';

export interface PredictTask extends BaseInterface {
  inputQuestion: string;
  predictedQuestion: string;
  inputTime: Date;
  outputTime: Date;
  status: string;
}
