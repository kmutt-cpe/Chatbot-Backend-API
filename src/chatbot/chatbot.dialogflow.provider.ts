import { Injectable } from '@nestjs/common';
import {
  DialogFlowFulfillmentResponse,
  DialogFlowIntent,
  DialogFlowParam,
  DialogFlowResponse,
  OutputContexts,
  QueryResult,
} from 'nestjs-dialogflow';

@Injectable()
export class ChatbotDialogflowProvider {
  @DialogFlowIntent('ตารางสอบซ้อน')
  public async handleMyIntent1(
    dialogFlowResponse: DialogFlowResponse
  ): Promise<DialogFlowFulfillmentResponse> {
    console.log('Intent1', dialogFlowResponse);
    return {} as DialogFlowFulfillmentResponse;
  }

  @DialogFlowIntent('My:intent2')
  public async handleMyIntent2(
    dialogFlowResponse: DialogFlowResponse
  ): Promise<DialogFlowFulfillmentResponse> {
    console.log('Intent2', dialogFlowResponse);
    return {} as DialogFlowFulfillmentResponse;
  }

  @DialogFlowIntent('My:intent3')
  public async handleMyIntent3(
    @DialogFlowParam('queryResult.outputContexts') outputContexts: OutputContexts
  ): Promise<DialogFlowFulfillmentResponse> {
    console.log('Intent3', outputContexts);
    return {} as DialogFlowFulfillmentResponse;
  }

  @DialogFlowIntent('My:intent4')
  public async handleMyIntent4(
    @DialogFlowParam('queryResult') queryResult: QueryResult
  ): Promise<DialogFlowFulfillmentResponse> {
    console.log('Intent4', queryResult);
    return {} as DialogFlowFulfillmentResponse;
  }
}
