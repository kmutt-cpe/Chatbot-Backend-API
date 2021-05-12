import { Injectable } from '@nestjs/common';
import {
  DialogFlowAction,
  DialogFlowIntent,
  DialogFlowParam,
  DialogFlowResponse,
} from 'nestjs-dialogflow';
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
    const msec = 4000;
    await delay(msec);
    // console.log(JSON.stringify(followUpEvent('dead_lock_extend_1', { id: predictedTaskId })));
    return JSON.stringify(followUpEvent('dead_lock_extend_1', { id: predictedTaskId }));
  }

  @DialogFlowAction('followupevent')
  @DialogFlowIntent('intent_extend_deadlock_1')
  public async extendDeadlod(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    delay(4000);
    const predictedId = dialogflowMessage.queryResult.parameters.id || '';
    const replyMessage = await this.chatbotService.getReplyMessage(predictedId);
    return JSON.stringify(createFulfillmentResponse(replyMessage));
  }
}
