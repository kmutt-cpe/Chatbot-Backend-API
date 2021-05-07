import { IsString } from 'class-validator';
import { PredictTask as PredictTaskInterface } from '../predictTask.interface';
export class CreatePredictTaskDto implements PredictTaskInterface {
  predictedAnswer: undefined;
  id: undefined;
  predictedQuestion: undefined;
  predictedQuestionId: undefined;
  inputTime: undefined;
  outputTime: undefined;
  status: undefined;

  @IsString() inputQuestion: string;
}
