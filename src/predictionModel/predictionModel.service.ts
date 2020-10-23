import { Injectable } from '@nestjs/common';

@Injectable()
export class PredictionModelService {
  getHello(): string {
    return 'Hello World!';
  }
}
