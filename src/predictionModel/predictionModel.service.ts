import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { getCustomRepository } from 'typeorm';
import { PredictTaskRepository } from './domain/predictTask.repository';
import { PredictTaskDto } from './dto/predictTask.dto';

@Injectable()
export class PredictionModelService {
  constructor(
    @InjectQueue('predictionModelQueue') private readonly predictTaskQueue: Queue,
    private readonly predictTaskRepo: PredictTaskRepository
  ) {}

  async createPredictTask(inputQuestion: string): Promise<PredictTaskDto> {
    let predictTask = this.predictTaskRepo.create();
    predictTask.inputQuestion = inputQuestion;
    predictTask = await this.predictTaskRepo.save(predictTask);
    const job = await this.predictTaskQueue.add('predictQuestion', predictTask);
    // while ((await job.getState()) != 'completed');

    predictTask = await this.predictTaskRepo.findById(predictTask.id);
    const predictTaskDto = predictTask.getData();
    return predictTaskDto;
  }

  async getPredictedResult(id: string): Promise<PredictTaskDto> {
    const predictTask = await this.predictTaskRepo.findById(id);
    const predictTaskDto = predictTask.getData();
    predictTaskDto;
    return predictTaskDto;
  }
}
