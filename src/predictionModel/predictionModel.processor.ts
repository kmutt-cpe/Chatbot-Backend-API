import { Process, Processor } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';
import { FAQService } from 'knowledgeManagement/modules/faq/faq.service';
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
    // predictTask.inputTimeCategory = new Date();
    // predictTask.status = TaskStatus.IN_PROCESS_CATEGORY;
    // await this.predictTaskRepo.save(predictTask);

    /** Sending to category model */
    // const predictedCategoryResponse = await this.httpService
    //   .post<{ category: string; accuracy: number }>(process.env.CATEGORY_MODEL_URL, {
    //     inputQuestion,
    //   })
    //   .toPromise()
    //   .then((res) => res.data)
    //   .catch((e) => console.log(e));

    /** After sending to model */
    // predictTask.outputTimeCategory = new Date();
    // const { category, accuracy } = predictedCategoryResponse || { category: null, accuracy: -1 };
    // predictTask.categoryAccuracy = accuracy;
    // predictTask.predictedCategory = category;

    /** Query questions */
    // if (category) {
    //   predictTask.status = TaskStatus.SUCCESS_CATEGORY;
    //   predictTask.predictedCategory = category;
    // } else {
    //   predictTask.status = TaskStatus.FAILED_CATEGORY;
    //   predictTask.predictedCategory = '';
    // }
    // await this.predictTaskRepo.save(predictTask);

    /** Before sending to question model */
    predictTask.inputTimeQuestion = new Date();
    predictTask.status = TaskStatus.IN_PROCESS_QUESTION;
    await this.predictTaskRepo.save(predictTask);
    /** Sending to question model */
    const predictedResponse = await this.httpService
      .post<{ predictedQuestion: string; similarity: string; category: string; accuracy }>(
        process.env.QUESTION_MODEL_URL,
        {
          // category,
          inputQuestion,
        }
      )
      .toPromise()
      .then((res) => res.data)
      .catch((e) => console.log(e));

    /** After sending to question model */
    predictTask.outputTimeQuestion = new Date();
    const { predictedQuestion, similarity, category, accuracy } =
      predictedResponse && predictedResponse;
    const questionEntity = await this.faqService.getFAQ({ where: { question: predictedQuestion } });
    /** Save result */
    /** If do not have response, fail */
    if (!predictedQuestion) {
      predictTask.status = TaskStatus.FAILED_QUESTION;
      predictTask.predictedAnswer = 'กรุณารอเจ้าหน้าที่มาตอบ';
    } else if (!questionEntity) {
      /** If cannot find question entity */
      predictTask.status = TaskStatus.CANNOT_FIND_QUSTION;
      predictTask.predictedQuestion = predictedQuestion;
      predictTask.predictedAnswer = 'กรุณารอเจ้าหน้าที่มาตอบ';
    } /* Else success */ else {
      predictTask.status = TaskStatus.SUCCESS_QUESTION;
      predictTask.predictedQuestionId = questionEntity.id;
      predictTask.categoryAccuracy = parseFloat(accuracy);
      predictTask.questionAccuracy = parseFloat(similarity);
      predictTask.predictedCategory = category;
      predictTask.predictedQuestion = predictedQuestion;
      predictTask.predictedAnswer = questionEntity.answer;
    }

    await this.predictTaskRepo.save(predictTask);
  }
}
