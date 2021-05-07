import { Process, Processor } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';
import { delay } from 'chatbot/helper/helperFunction';
import { FAQService } from 'knowledgeManagement/modules/faq/faq.service';
import { getCustomRepository } from 'typeorm';
import { TaskStatus } from './domain/predictTask.entity';
import { PredictTaskRepository } from './domain/predictTask.repository';

@Processor('predictionModelQueue')
export class PredictionModelProcessor {
  constructor(private readonly faqService: FAQService, private readonly httpService: HttpService) {}
  @Process('predictQuestion')
  async handle(job: Job): Promise<void> {
    const jobData = job.data;
    const predictTaskRepo = getCustomRepository(PredictTaskRepository);
    const predictTask = await predictTaskRepo.findById(jobData.id);
    const questionEntities = await this.faqService.getAllFAQ();
    const questions = questionEntities.map((faq) => faq.question);

    /** Before sending to model */
    predictTask.inputTime = new Date();
    predictTask.status = TaskStatus.IN_PROCESS;
    predictTaskRepo.save(predictTask);
    const { inputQuestion } = predictTask;

    /** Sending to model */
    // todo: Send to prediciton model
    const predictedResponse = await this.httpService
      .get<{ intent: string; category: string; confidence: number }>(
        'https://openapi.botnoi.ai/botnoi/ecommerce',
        {
          params: { keyword: inputQuestion },
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjA2Nzk5ODcsImlkIjoiYzAyMWM3YmQtNWEyOS00MTE5LWE3OWMtZDI2NjMyNzQ3MDA4IiwiaXNzIjoiemczUTBJY3ZTakh2OWN4VG1HVXpzRWFDM09jbEprV0QiLCJuYW1lIjoi4LiZ4Li44LmJ4LiH4LiB4Lil4LmJ4LiyIiwicGljIjoiaHR0cHM6Ly9wcm9maWxlLmxpbmUtc2Nkbi5uZXQvMGhHdENRRW1rWUdGdC1LQTZ0ZHBSbkRFSnRGallKQmg0VEJob0RiMTR0Rld0VEdWcGZGMDllYmx3clFHZ0RUUXhZRWtZQVB3bDZGbTBIIn0.EiOY0bdsD7ekq6V4EB3IWfXysyofViBwYy3fkZECRLs',
          },
        }
      )
      .toPromise();

    const predictedQuestion = predictedResponse.data && predictedResponse.data.intent;

    /** After sending to model */
    const questionEntity = questionEntities.find(
      (question) => question.question === predictedQuestion
    );

    if (questionEntity) {
      predictTask.status = TaskStatus.SUCCESS;

      predictTask.predictedQuestionId = questionEntity.id;
      predictTask.predictedQuestion = questionEntity.question;
      predictTask.predictedAnswer = questionEntity.answer;
      predictTask.outputTime = new Date();
    } else {
      predictTask.status = TaskStatus.FAILED;
      predictTask.predictedQuestionId = '';
      predictTask.predictedQuestion = 'question';
      predictTask.predictedAnswer = 'ไม่เข้าใจคำถาม';
      predictTask.outputTime = new Date();
    }

    await predictTaskRepo.save(predictTask);
  }
}
