import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionModelController } from './predictionModel.controller';
import { PredictionModelProcessor } from './predictionModel.processor';
import { PredictionModelService } from './predictionModel.service';
import { PredictTaskRepository } from './repositories/predictTask.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'predictionModelQueue',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TypeOrmModule.forFeature([PredictTaskRepository]),
  ],
  controllers: [PredictionModelController],
  providers: [PredictionModelProcessor, PredictionModelService],
})
export class PredictionModelModule {}
