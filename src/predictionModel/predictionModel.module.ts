import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FAQModule } from 'knowledgeManagement/modules/faq/faq.module';
import { PredictionModelController } from './predictionModel.controller';
import { PredictionModelProcessor } from './predictionModel.processor';
import { PredictionModelService } from './predictionModel.service';
import { PredictTaskRepository } from './domain/predictTask.repository';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'predictionModelQueue',
      useFactory: (configService: ConfigService) => configService.get('redisConfig'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([PredictTaskRepository]),
    FAQModule,
  ],
  controllers: [PredictionModelController],
  providers: [PredictionModelProcessor, PredictionModelService],
  exports: [PredictionModelService],
})
export class PredictionModelModule {}
