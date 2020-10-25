import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelInputRepository } from './domain/repositories/predictionModel.repository';
import { PredictionModelController } from './predictionModel.controller';
import { PredictionModelService } from './predictionModel.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModelInputRepository])],
  controllers: [PredictionModelController],
  providers: [PredictionModelService],
})
export class PredictionModelModule {}
