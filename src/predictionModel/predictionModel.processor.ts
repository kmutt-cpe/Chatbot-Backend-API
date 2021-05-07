import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { delay } from 'chatbot/helper/helperFunction';
import { FAQService } from 'knowledgeManagement/modules/faq/faq.service';
import { getCustomRepository } from 'typeorm';
import { TaskStatus } from './domain/predictTask.entity';
import { PredictTaskRepository } from './domain/predictTask.repository';

@Processor('predictionModelQueue')
export class PredictionModelProcessor {
  constructor(private readonly faqService: FAQService) {}

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
    await delay(1000);
    const predictedQuestion = 'PredictedQuestion';

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
      predictTask.predictedAnswer = 'ดรอปซะสิ ถามแปลก';
      predictTask.outputTime = new Date();
    }

    await predictTaskRepo.save(predictTask);
  }
}
