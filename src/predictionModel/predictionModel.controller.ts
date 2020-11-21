import { Body, Controller, Post } from '@nestjs/common';
import { CreatePredictTaskDto } from './dto/createPredictTask.dto';
import { PredictionModelService } from './predictionModel.service';

@Controller('predictionModel')
export class PredictionModelController {
  constructor(private readonly predictionModelService: PredictionModelService) {}

  @Post('createPredictTask')
  createPredictTask(@Body() createPredictTaskDto: CreatePredictTaskDto): Promise<string> {
    return this.predictionModelService.create(createPredictTaskDto);
  }
}
