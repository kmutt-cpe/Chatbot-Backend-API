import { Injectable } from '@nestjs/common';
import {
  DialogFlowAction,
  DialogFlowIntent,
  DialogFlowParam,
  DialogFlowResponse,
} from 'nestjs-dialogflow';
import { TaskStatus } from 'predictionModel/domain/predictTask.entity';
import { ChatbotService } from './chatbot.service';
import { delay, createFulfillmentResponse, followUpEvent } from './helper/helperFunction';

@Injectable()
export class ChatbotDialogflowProvider {
  constructor(private readonly chatbotService: ChatbotService) {}

  @DialogFlowIntent('Default Fallback Intent')
  public async defaultIntent(
    @DialogFlowParam() dialogflowMessage: DialogFlowResponse
  ): Promise<string> {
    const {
      queryResult: { queryText },
    } = await this.chatbotService.saveChatMessage(dialogflowMessage);
    const predictedTaskId = await this.chatbotService.predictMessage(queryText);
    // await delay(3500);

    let success = false;
    let replyMessage = '';
    const taskTimer = setInterval(async () => {
      const predictTaskDto = await this.chatbotService.getReplyMessage(predictedTaskId);
      if (predictTaskDto.status === TaskStatus.SUCCESS_QUESTION) {
        success = true;
        replyMessage = predictTaskDto.predictedAnswer;
        clearInterval(taskTimer);
        clearTimeout(taskTimeout);
      }
    }, 500);

    const taskTimeout = setTimeout(() => {
      clearInterval(taskTimer);
    }, 3500);
    console.log('First:', replyMessage);

    return success
      ? JSON.stringify(createFulfillmentResponse(replyMessage))
      : JSON.stringify(followUpEvent('dead_lock_extend', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_extend_deadlock')
  public async extendDeadlock_1(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    // await delay(3500);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    // return JSON.stringify(followUpEvent('reply_question', { id: predictedTaskId }));

    let success = false;
    let replyMessage = '';
    const taskTimer = setInterval(async () => {
      const predictTaskDto = await this.chatbotService.getReplyMessage(predictedTaskId);
      if (predictTaskDto.status === TaskStatus.SUCCESS_QUESTION) {
        success = true;
        replyMessage = predictTaskDto.predictedAnswer;
        clearInterval(taskTimer);
        clearTimeout(taskTimeout);
      }
    }, 500);

    const taskTimeout = setTimeout(() => {
      clearInterval(taskTimer);
    }, 3500);
    console.log('Extend:', replyMessage);

    return success
      ? JSON.stringify(createFulfillmentResponse(replyMessage))
      : JSON.stringify(followUpEvent('reply_question', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_reply_question')
  public async lastExtendDeadlock(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    // await delay(3500);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    // const replyMessage = (await this.chatbotService.getReplyMessage(predictedId)).predictedAnswer;
    // return JSON.stringify(createFulfillmentResponse(replyMessage));
    let replyMessage = '';
    const taskTimer = setInterval(async () => {
      const predictTaskDto = await this.chatbotService.getReplyMessage(predictedTaskId);
      if (predictTaskDto.status === TaskStatus.SUCCESS_QUESTION) {
        replyMessage = predictTaskDto.predictedAnswer;
        clearInterval(taskTimer);
        clearTimeout(taskTimeout);
      }
    }, 500);

    const taskTimeout = setTimeout(() => {
      clearInterval(taskTimer);
    }, 3500);
    console.log('Last:', replyMessage);

    return JSON.stringify(createFulfillmentResponse(replyMessage));
  }
}
