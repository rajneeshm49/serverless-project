import { Controller, Get } from '@nestjs/common';

@Controller('care')
export class CareController {
  @Get('bs')
  getData() {
    return { message: 'Welcome to Care controller!' };
  }
}
