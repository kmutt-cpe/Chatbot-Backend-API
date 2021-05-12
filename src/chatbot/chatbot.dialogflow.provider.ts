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
    // console.log(queryText);
    const predictedTaskId = await this.chatbotService.predictMessage(queryText);
    const msec = 4000;
    await delay(msec);
    // console.log(JSON.stringify(followUpEvent('dead_lock_extend_1', { id: predictedTaskId })));
    console.log('TEMP');
    return JSON.stringify(followUpEvent('dead_lock_extend_1', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_extend_deadlock_1')
  public async extendDeadlock_1(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    // console.log('First deadlock');
    await delay(4000);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    return JSON.stringify(followUpEvent('reply_question', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_extend_deadlock_2')
  public async extendDeadlock_2(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    // console.log('Second deadlock');
    await delay(4000);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    return JSON.stringify(followUpEvent('dead_lock_extend_3', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_extend_deadlock_3')
  public async extendDeadlock_3(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    console.log('Third deadlock');
    delay(4000);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    return JSON.stringify(followUpEvent('dead_lock_extend_4', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_extend_deadlock_4')
  public async extendDeadlock_4(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    console.log('Fourth deadlock');
    delay(4000);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    return JSON.stringify(followUpEvent('dead_lock_extend_5', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_extend_deadlock_5')
  public async extendDeadlock_5(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    console.log('Fifth deadlock');
    delay(4000);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    return JSON.stringify(followUpEvent('dead_lock_extend_6', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_extend_deadlock_6')
  public async extendDeadlock_6(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    console.log('Sixth deadlock');
    delay(4000);
    const predictedTaskId = dialogflowMessage.queryResult.parameters.id || '';
    return JSON.stringify(followUpEvent('reply_question', { id: predictedTaskId }));
  }

  @DialogFlowIntent('intent_reply_question')
  public async lastExtendDeadlock(@DialogFlowParam() dialogflowMessage: any): Promise<string> {
    console.log('Last Intent');
    delay(4000);
    const predictedId = dialogflowMessage.queryResult.parameters.id || '';
    const replyMessage = await this.chatbotService.getReplyMessage(predictedId);
    console.log('Message', replyMessage);
    return JSON.stringify(createFulfillmentResponse(replyMessage));
  }
}
