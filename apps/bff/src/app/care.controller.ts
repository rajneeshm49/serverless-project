import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('care')
export class CareController {
  constructor(
    private readonly logger: Logger,
    private readonly appService: AppService
  ) {}
  @Get('bs')
  getData() {
    this.logger.log('Iam in care controller and calling getData function');
    return { message: 'Welcome to Care controller!' };
  }

  @Get('calculate')
  calculate(): number {
    this.logger.log('Calculate the fibonnaci for 10');
    return this.appService.calculateFibo(4);
  }
}
