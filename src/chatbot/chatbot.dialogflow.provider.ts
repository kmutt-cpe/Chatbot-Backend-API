import { Injectable } from '@nestjs/common';
import { DialogFlowIntent, DialogFlowParam, DialogFlowResponse } from 'nestjs-dialogflow';
import { ChatbotService } from './chatbot.service';
import { createFulfillmentResponse } from './helper/helperFunction';

@Injectable()
export class ChatbotDialogflowProvider {
  constructor(private readonly chatbotService: ChatbotService) {}

  @DialogFlowIntent('Default Fallback Intent')
  public async handleMyIntent1(
    @DialogFlowParam() chatMessage: DialogFlowResponse
  ): Promise<string> {
    const {
      queryResult: { queryText },
    } = await this.chatbotService.saveChatMessage(chatMessage);
    const replyMessage = await this.chatbotService.getReplyMessage(queryText);
    const fulfillmentResponse = createFulfillmentResponse(replyMessage);
    return JSON.stringify(fulfillmentResponse);
  }
}
