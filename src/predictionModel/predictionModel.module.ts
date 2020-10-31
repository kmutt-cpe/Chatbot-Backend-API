import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionModelController } from './predictionModel.controller';
import { PredictionModelService } from './predictionModel.service';
import { PredictTaskRepository } from './repositories/predictTask.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PredictTaskRepository])],
  controllers: [PredictionModelController],
  providers: [PredictionModelService],
})
export class PredictionModelModule {}
