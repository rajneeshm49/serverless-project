import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { Server } from 'http';

import { AppModule } from './app/app.module';

// Needed for lambda, lambda error if changed to "import * as express from 'express'"
const express = require('express'); // eslint-disable-line @typescript-eslint/no-var-requires

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  // if (!cachedServer) {
  const expressApp = express();
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    }
  );
  nestApp.use(eventContext());
  // nestApp.setGlobalPrefix(process.env['CONNECTOR_PREFIX'] || '');
  await nestApp.init();
  cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  // }
  return cachedServer;
}

export const handler: Handler = async (event: unknown, context: Context) => {
  process.env.AWS_REQUEST_ID = context.awsRequestId;
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
