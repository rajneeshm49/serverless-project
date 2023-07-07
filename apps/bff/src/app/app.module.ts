import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './cors.middleware';
import { CareController } from './care.controller';

@Module({
  imports: [],
  controllers: [AppController, CareController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
