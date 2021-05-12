import { DialogFlowFulfillmentResponse, DialogFlowResponse } from 'nestjs-dialogflow';
import { ChatMessageConverted } from './chatMessageConverted.interface';

/**
 * Convert queryResult(Object) and originalDetectIntentRequest(Object) to JSON string
 * @param chatMessage
 */
export const queryResultToJSON = (chatMessage: DialogFlowResponse): ChatMessageConverted => {
  return {
    responseId: chatMessage.responseId,
    queryResult: JSON.stringify(chatMessage.queryResult),
    originalDetectIntentRequest: JSON.stringify(chatMessage.originalDetectIntentRequest),
    session: chatMessage.session,
  };
};

export const createFulfillmentResponse = (message: string): DialogFlowFulfillmentResponse => {
  return {
    fulfillmentMessages: [
      {
        text: {
          text: [message],
        },
      },
    ],
  } as DialogFlowFulfillmentResponse;
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const followUpEvent = (intent: string, parameters?: any) => {
  return {
    followupEventInput: {
      name: intent,
      parameters,
      languageCode: 'th-TH',
    },
  };
};
