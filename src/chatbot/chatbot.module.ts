import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogFlowModule } from 'nestjs-dialogflow';
import { ChatbotController } from './chatbot.controller';
import { ChatbotDialogflowProvider } from './chatbot.dialogflow.provider';
import { ChatbotService } from './chatbot.service';
import { FBMessageRepository } from './domain/fbMessage.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FBMessageRepository]),
    DialogFlowModule.forRoot({
      basePath: 'chatbot',
      postPath: 'dialog-flow',
    }),
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService, ChatbotDialogflowProvider],
})
export class ChatbotModule {}
