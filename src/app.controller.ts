import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  checkCookie(@Session() session: Record<string, any>) {
    if (session.userLoggedCookie) {
      return {
        logged: true,
        name: session.name,
      };
    }
    return false;
  }
}
