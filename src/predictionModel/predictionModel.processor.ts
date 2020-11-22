import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { getCustomRepository } from 'typeorm';
import { TaskStatus } from './entities/predictTask.entity';
import { PredictTaskRepository } from './repositories/predictTask.repository';

@Processor('predictionModelQueue')
export class PredictionModelProcessor {
  @Process('predictQuestion')
  async handle(job: Job): Promise<void> {
    const jobData = job.data;
    const predictTaskRepo = getCustomRepository(PredictTaskRepository);
    const predictTask = await predictTaskRepo.findById(jobData.id);

    predictTask.inputTime = new Date();
    predictTask.status = TaskStatus.IN_PROCESS;
    predictTaskRepo.save(predictTask);

    // todo: Send to prediciton model
    await delay(5000);
    predictTask.predictedQuestion = 'PredictedQuestion';

    predictTask.outputTime = new Date();
    predictTask.status = TaskStatus.SUCCESS;

    await predictTaskRepo.save(predictTask);
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
