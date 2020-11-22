import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'config/databaseConfig';
import redisConfig from 'config/redisConfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import { KnowledgeManagementModule } from './knowledgeManagement/km.module';
import { PredictionModelModule } from './predictionModel/predictionModel.module';

@Module({
  imports: [
    // todo: Add GraphQL root
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV ? '.production.env' : '.development.env',
      load: [databaseConfig, redisConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('databaseConfig'),
      inject: [ConfigService],
    }),
    KnowledgeManagementModule,
    PredictionModelModule,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
