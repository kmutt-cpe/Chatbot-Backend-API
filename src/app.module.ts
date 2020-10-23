import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgeManagementModule } from './knowledgeManagement';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictionModelService } from 'predictionModel/predictionModel.service';

@Module({
  imports: [
    // todo: Add GraphQL root
    TypeOrmModule.forRoot(),
    KnowledgeManagementModule,
    PredictionModelService
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
