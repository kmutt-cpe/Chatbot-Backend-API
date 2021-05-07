import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DialogFlowResponse } from 'nestjs-dialogflow';
import { PredictionModelService } from 'predictionModel/predictionModel.service';
import { ChatMessage } from './domain/chatMessage.entity';
import { ChatMessageRepository } from './domain/chatMessage.repository';
import { ChatMessageDto } from './dto/chatMessage.dto';
import { queryResultToJSON } from './helper/helperFunction';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly predictionModelService: PredictionModelService
  ) {}

  async saveChatMessage(chatMessage: DialogFlowResponse): Promise<ChatMessageDto> {
    let chatMessageEntity: ChatMessage = this.chatMessageRepository.create();
    const chatMessageJSON = queryResultToJSON(chatMessage);
    chatMessageEntity.setDataValues(chatMessageJSON);
    chatMessageEntity = await this.chatMessageRepository.save(chatMessageEntity);
    if (!chatMessageEntity)
      throw new HttpException('Cannot save chat message', HttpStatus.NOT_IMPLEMENTED);
    return chatMessageEntity.getData();
  }
}
