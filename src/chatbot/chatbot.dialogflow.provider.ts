import { Injectable } from '@nestjs/common';
import {
  DialogFlowFulfillmentResponse,
  DialogFlowIntent,
  DialogFlowParam,
  DialogFlowResponse,
  OutputContexts,
  QueryResult,
} from 'nestjs-dialogflow';
import { PredictionModelService } from 'predictionModel/predictionModel.service';
import { ChatbotService } from './chatbot.service';
import { createFulfillmentResponse } from './helper/helperFunction';

@Injectable()
export class ChatbotDialogflowProvider {
  constructor(
    private readonly chatbotService: ChatbotService,
    private readonly predictionModelService: PredictionModelService
  ) {}

  @DialogFlowIntent('myEnrollment')
  public async handleMyIntent1(
    @DialogFlowParam() chatMessage: DialogFlowResponse
  ): Promise<string> {
    const {
      queryResult: { queryText },
    } = await this.chatbotService.saveChatMessage(chatMessage);
    const predictedResult = await this.predictionModelService.createPredictTask(queryText);
    const fulfilmentResposne = createFulfillmentResponse(predictedResult.predictedAnswer);

    return JSON.stringify(fulfilmentResposne);
  }
}
