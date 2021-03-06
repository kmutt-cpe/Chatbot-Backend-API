import { Injectable } from '@nestjs/common';
import { DialogFlowIntent, DialogFlowParam, DialogFlowResponse } from 'nestjs-dialogflow';
import { TaskStatus } from 'predictionModel/domain/predictTask.entity';
import { ChatbotService } from './chatbot.service';
import { delay, createFulfillmentResponse, followUpEvent } from './helper/helperFunction';

const timeout_exit = 3500;

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

    let timeCount = 0;
    while (timeCount <= timeout_exit) {
      const predictTaskDto = await this.chatbotService.getReplyMessage(predictedTaskId);
      if (predictTaskDto.status === TaskStatus.SUCCESS_QUESTION) {
        const replyMessage = predictTaskDto.predictedAnswer;
        return JSON.stringify(createFulfillmentResponse(replyMessage));
      }
      timeCount += 250;
      await delay(250);
    }

    return JSON.stringify(followUpEvent('dead_lock_extend', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_extend_deadlock')
  public async extendDeadlock_1(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    // await delay(3500);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    // return JSON.stringify(followUpEvent('reply_question', { id: predictedTaskId }));
    let timeCount = 0;
    while (timeCount <= timeout_exit) {
      const predictTaskDto = await this.chatbotService.getReplyMessage(predictedTaskId);
      if (predictTaskDto.status === TaskStatus.SUCCESS_QUESTION) {
        const replyMessage = predictTaskDto.predictedAnswer;
        return JSON.stringify(createFulfillmentResponse(replyMessage));
      }
      timeCount += 250;
      await delay(250);
    }

    return JSON.stringify(followUpEvent('reply_question', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_reply_question')
  public async lastExtendDeadlock(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    // await delay(3500);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    // const replyMessage = (await this.chatbotService.getReplyMessage(predictedId)).predictedAnswer;
    // return JSON.stringify(createFulfillmentResponse(replyMessage));
    let timeCount = 0;
    while (timeCount <= timeout_exit) {
      const predictTaskDto = await this.chatbotService.getReplyMessage(predictedTaskId);
      if (predictTaskDto.status === TaskStatus.SUCCESS_QUESTION) {
        const replyMessage = predictTaskDto.predictedAnswer;
        return JSON.stringify(createFulfillmentResponse(replyMessage));
      }
      timeCount += 250;
      await delay(250);
    }

    return JSON.stringify(createFulfillmentResponse('?????????????????????????????????????????????????????????????????????'));
  }
}
