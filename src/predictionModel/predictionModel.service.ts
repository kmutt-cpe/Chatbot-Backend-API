import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { getCustomRepository } from 'typeorm';
import { PredictTaskRepository } from './domain/predictTask.repository';
import { PredictTaskDto } from './dto/predictTask.dto';

@Injectable()
export class PredictionModelService {
  constructor(@InjectQueue('predictionModelQueue') private readonly predictTaskQueue: Queue) {}

  async createPredictTask(inputQuestion: string): Promise<PredictTaskDto> {
    const predictTaskRepo = getCustomRepository(PredictTaskRepository);
    let predictTask = predictTaskRepo.create();
    predictTask.inputQuestion = inputQuestion;
    predictTask = await predictTaskRepo.save(predictTask);
    const job = await this.predictTaskQueue.add('predictQuestion', predictTask);
    while ((await job.getState()) != 'completed');

    predictTask = await predictTaskRepo.findById(predictTask.id);
    const predictTaskDto = predictTask.getData();
    predictTask.predictedAnswer =
      predictTask.questionAccuracy >= parseFloat(process.env.QUESTION_SIMILARITY)
        ? predictTask.predictedAnswer
        : 'กรุณารอเจ้าหน้าที่มาตอบค่ะ';
    return predictTaskDto;
  }
}
