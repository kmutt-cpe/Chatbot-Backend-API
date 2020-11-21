import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import { KnowledgeManagementModule } from './knowledgeManagement/km.module';
import { PredictionModelModule } from './predictionModel/predictionModel.module';

@Module({
  imports: [
    // todo: Add GraphQL root
    TypeOrmModule.forRoot(),
    KnowledgeManagementModule,
    PredictionModelModule,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
