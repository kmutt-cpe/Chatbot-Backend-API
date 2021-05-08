import { Process, Processor } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';
import { FAQService } from 'knowledgeManagement/modules/faq/faq.service';
import { getCustomRepository } from 'typeorm';
import { TaskStatus } from './domain/predictTask.entity';
import { PredictTaskRepository } from './domain/predictTask.repository';

@Processor('predictionModelQueue')
export class PredictionModelProcessor {
  constructor(
    private readonly faqService: FAQService,
    private readonly httpService: HttpService,
    private readonly predictTaskRepo: PredictTaskRepository
  ) {}

  @Process('predictQuestion')
  async handle(job: Job): Promise<void> {
    const jobData = job.data;
    const predictTask = await this.predictTaskRepo.findById(jobData.id);
    const { inputQuestion } = predictTask;

    /** Before sending to category model */
    predictTask.inputTimeCategory = new Date();
    predictTask.status = TaskStatus.IN_PROCESS_CATEGORY;
    await this.predictTaskRepo.save(predictTask);

    /** Sending to category model */
    // todo: Use predicted category model
    const predictedCategoryResponse = { category: 'test' };

    /** After sending to model */
    predictTask.outputTimeCategory = new Date();
    const { category } = predictedCategoryResponse;

    /** Query questions */
    const questionsDto = await this.faqService.getAllFAQ();
    if (category) {
      predictTask.status = TaskStatus.SUCCESS_CATEGORY;
      predictTask.predictedCategory = category;
    } else {
      predictTask.status = TaskStatus.FAILED_CATEGORY;
      predictTask.predictedCategory = '';
    }
    await this.predictTaskRepo.save(predictTask);

    let questionFilter = [];
    for (const questionDto of questionsDto) {
      if ((await questionDto.category).category === category) questionFilter.push(questionDto);
    }

    if (questionFilter.length === 0) questionFilter = questionsDto;
    const questions = questionFilter.map((faq) => faq.question);

    /** Before sending to question model */
    predictTask.inputTimeQuestion = new Date();
    predictTask.status = TaskStatus.IN_PROCESS_QUESTION;
    await this.predictTaskRepo.save(predictTask);

    /** Sending to question model */
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

    /** After sending to question model */
    predictTask.outputTimeQuestion = new Date();
    const predictedQuestion = predictedResponse.data && predictedResponse.data.intent;
    const questionEntity = questionFilter.find(
      (question) => question.question === predictedQuestion
    );

    /** Save result */
    /** If do not have response, fail */
    if (!predictedQuestion) {
      predictTask.status = TaskStatus.FAILED_QUESTION;
      predictTask.predictedQuestionId = '';
      predictTask.predictedQuestion = predictedQuestion;
      predictTask.predictedAnswer = 'โปรดลองใหม่อีกครั้ง';
    } else if (!questionEntity) {
      /** If cannot find question entity, ca */
      predictTask.status = TaskStatus.CANNOT_FIND_QUSTION;
      predictTask.predictedQuestionId = '';
      predictTask.predictedQuestion = predictedQuestion;
      predictTask.predictedAnswer = questionEntity.answer;
    } /* Else success */ else {
      predictTask.status = TaskStatus.SUCCESS_QUESTION;
      predictTask.predictedQuestionId = questionEntity.id;
      predictTask.predictedQuestion = predictedQuestion;
      predictTask.predictedAnswer = questionEntity.answer;
    }

    await this.predictTaskRepo.save(predictTask);
  }
}
