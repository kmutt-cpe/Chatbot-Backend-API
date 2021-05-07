/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryResult } from 'nestjs-dialogflow';

export class ChatMessageDto {
  id: string;
  responseId: string;
  session: string;
  queryResult: QueryResult;
  originalDetectIntentRequest: any;
}
