import { IsString } from 'class-validator';
import { PredictTask as PredictTaskInterface } from '../interfaces/predictTask.interface';
export class CreatePredictTaskDto implements PredictTaskInterface {
  id: undefined;
  @IsString() inputQuestion: string;
  predictedQuestion: undefined;
  inputTime: undefined;
  outputTime: undefined;
  status: undefined;
}
