import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionModelController } from './predictionModel.controller';
import { PredictionModelService } from './predictionModel.service';

@Module({
  imports: [],
  controllers: [PredictionModelController],
  providers: [PredictionModelService],
})
export class PredictionModelModule {}
