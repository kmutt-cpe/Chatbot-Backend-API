import { Controller, Get } from '@nestjs/common';
import { UserService } from './km.user.service';

@Controller('km/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}
