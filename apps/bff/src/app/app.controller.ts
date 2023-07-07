import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  getData() {
    return { message: 'Welcome to bff!' };
  }
}
