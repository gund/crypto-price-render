import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { Handler } from 'aws-lambda';
import { AppModule } from './app/app.module';

const globalPrefix = 'api';

export async function bootstrapApp() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  return app;
}

async function bootstrapServer() {
  const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');

  const app = await bootstrapApp();

  const port = process.env.PORT || 3333;
  const config = new DocumentBuilder()
    .setTitle('Crypto Price Render')
    .setDescription('Render current crypto price as HTML or JSON')
    .setVersion('1.0')
    .addTag('cpr')
    .build();

  SwaggerModule.setup(
    globalPrefix,
    app,
    SwaggerModule.createDocument(app, config)
  );

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

async function bootstrapLambda() {
  const { default: serverlessExpress } = await import(
    '@vendia/serverless-express'
  );

  const app = await bootstrapApp();
  await app.init();

  return serverlessExpress({ app: app.getHttpAdapter().getInstance() });
}

let server: Handler;

export const handler: Handler = async (event, context, callback) => {
  console.log('ENV', process.env);
  server = server ?? (await bootstrapLambda());
  return server(event, context, callback);
};

if (process.env.START_SERVER !== undefined) {
  bootstrapServer().catch(Logger.error);
}
