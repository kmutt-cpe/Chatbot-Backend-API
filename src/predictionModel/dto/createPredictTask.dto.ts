import { IsString } from 'class-validator';
import { PredictTask as PredictTaskInterface } from '../predictTask.interface';
export class CreatePredictTaskDto implements PredictTaskInterface {
  id: undefined;
  predictedCategory: undefined;
  categoryAccuracy: undefined;
  inputTimeCategory: undefined;
  outputTimeCategory: undefined;
  questionAccuracy: undefined;
  inputTimeQuestion: undefined;
  outputTimeQuestion: undefined;
  predictedAnswer: undefined;
  predictedQuestion: undefined;
  predictedQuestionId: undefined;
  status: undefined;

  @IsString() inputQuestion: string;
}
