import { Controller, Res, Req, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { Response, Request } from 'express';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('fb-message')
  async saveFBMessage(@Req() req: Request, @Res() res: Response): Promise<Response> {
    await this.chatbotService.saveFbMessage(req.body.message);
    return res.sendStatus(200);
  }
}
