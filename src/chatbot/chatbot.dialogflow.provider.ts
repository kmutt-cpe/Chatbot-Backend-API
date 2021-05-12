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
    await delay(3500);
    return JSON.stringify(followUpEvent('dead_lock_extend', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_extend_deadlock')
  public async extendDeadlock_1(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    await delay(3500);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    return JSON.stringify(followUpEvent('reply_question', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_reply_question')
  public async lastExtendDeadlock(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    await delay(3500);
    const predictedId = dialogflowMessage.queryResult.parameters.id || '';
    const replyMessage = await this.chatbotService.getReplyMessage(predictedId);
    return JSON.stringify(createFulfillmentResponse(replyMessage));
  }
}
