import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePredictTaskDto } from './dto/createPredictTask.dto';
import { PredictTaskDto } from './dto/predictTask.dto';
import { PredictionModelService } from './predictionModel.service';

@Controller('prediction-model')
export class PredictionModelController {
  constructor(private readonly predictionModelService: PredictionModelService) {}

  @Get()
  async getAllPredictedResult(
    @Query('id') id?: string
  ): Promise<PredictTaskDto | PredictTaskDto[]> {
    if (id) return await this.predictionModelService.getPredictedResult(id);
    return await this.predictionModelService.getAllPredictedResult();
  }

  @Post()
  async createPredictTask(
    @Body() createPredictTaskDto: CreatePredictTaskDto
  ): Promise<PredictTaskDto> {
    const { inputQuestion } = createPredictTaskDto;
    return await this.predictionModelService.createPredictTask(inputQuestion);
  }
}
