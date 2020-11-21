import { PredictTask as PredictTaskInterface } from '../interfaces/predictTask.interface';
export class CreatePredictTaskDto implements PredictTaskInterface {
  inputQuestion: string;
  predictedQuestion: string;
  inputTime: undefined;
  outputTime: undefined;
  status: undefined;
}
