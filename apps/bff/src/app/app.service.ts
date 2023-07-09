import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to bff!' };
  }

  calculateFibo(num) {
    let total = 1;
    for (let n = num; n > 0; n--) {
      total = total * n;
    }
    return total;
  }
}
