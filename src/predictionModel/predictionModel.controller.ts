import { Body, Controller, Post } from '@nestjs/common';
import { CreatePredictTaskDto } from './dto/createPredictTask.dto';
import { PredictTaskDto } from './dto/predictTask.dto';
import { PredictionModelService } from './predictionModel.service';

@Controller('prediction-model')
export class PredictionModelController {
  constructor(private readonly predictionModelService: PredictionModelService) {}

  @Post('create-predict-task')
  createPredictTask(@Body() createPredictTaskDto: CreatePredictTaskDto): Promise<PredictTaskDto> {
    const { inputQuestion } = createPredictTaskDto;
    return this.predictionModelService.createPredictTask(inputQuestion);
  }
}
