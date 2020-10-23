import { Controller, Get } from '@nestjs/common';
import { PredictionModelService } from './predictionModel.service';

@Controller()
export class PredictionModelController {
  constructor(private readonly predictionModelService: PredictionModelService) {}

  @Get()
  getHello(): string {
    return this.predictionModelService.getHello();
  }
}
