import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { getCustomRepository } from 'typeorm';
import { CreatePredictTaskDto } from './dto/createPredictTask.dto';
import { PredictTaskRepository } from './repositories/predictTask.repository';

@Injectable()
export class PredictionModelService {
  constructor(@InjectQueue('predictionModelQueue') private readonly predictTaskQueue: Queue) {}

  async create(createPredictTaskDto: CreatePredictTaskDto): Promise<string> {
    const inputQuestion = createPredictTaskDto.inputQuestion;

    const predictTaskRepo = getCustomRepository(PredictTaskRepository);
    let predictTask = predictTaskRepo.create();
    predictTask.inputQuestion = inputQuestion;
    predictTask = await predictTaskRepo.save(predictTask);

    const job = await this.predictTaskQueue.add('predictQuestion', predictTask);
    while ((await job.getState()) != 'completed');

    // Query the updated data
    predictTask = await predictTaskRepo.findById(predictTask.id);
    return predictTask.predictedQuestion;
  }
}
