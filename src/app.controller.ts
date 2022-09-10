import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  checkCookie(@Session() session: Record<string, any>) {
    console.log(session);
    if (session.userLoggedCookie) {
      return true;
    }
    return false;
  }
}
