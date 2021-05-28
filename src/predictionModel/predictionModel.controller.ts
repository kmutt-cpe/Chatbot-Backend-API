import { Delete } from '@nestjs/common';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'knowledgeManagement/modules/auth/guards/jwt-auth.guard';
import { CreatePredictTaskDto } from './dto/createPredictTask.dto';
import { PredictTaskDto } from './dto/predictTask.dto';
import { PredictionModelService } from './predictionModel.service';

@Controller('prediction-model')
export class PredictionModelController {
  constructor(private readonly predictionModelService: PredictionModelService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllPredictedResult(
    @Query('id') id?: string
  ): Promise<PredictTaskDto | PredictTaskDto[]> {
    if (id) return await this.predictionModelService.getPredictedResult(id);
    return await this.predictionModelService.getAllPredictedResult();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPredictTask(
    @Body() createPredictTaskDto: CreatePredictTaskDto
  ): Promise<PredictTaskDto> {
    const { inputQuestion } = createPredictTaskDto;
    return await this.predictionModelService.createPredictTask(inputQuestion);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteAllPredictTask(): Promise<PredictTaskDto[]> {
    return await this.predictionModelService.deleteAllPredictTask();
  }
}
