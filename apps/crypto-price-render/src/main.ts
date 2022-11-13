import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Handler } from 'aws-lambda';
import { AppModule } from './app/app.module';

const ApiPrefix = 'api';
const DocsPrefix = 'docs';

export async function bootstrapApp() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(ApiPrefix);

  const config = new DocumentBuilder()
    .setTitle('Crypto Price Render')
    .setDescription('Render current crypto price as HTML or JSON')
    .setVersion('1.0')
    .addTag('cpr')
    .build();

  SwaggerModule.setup(
    DocsPrefix,
    app,
    SwaggerModule.createDocument(app, config)
  );

  return app;
}

async function bootstrapServer() {
  const app = await bootstrapApp();

  const port = process.env.PORT || 3333;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${ApiPrefix}`
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
  if (event.path === `/${ApiPrefix}`) {
    event.path = `/${ApiPrefix}/`;
  } else if (event.path === `/${DocsPrefix}`) {
    event.path = `/${DocsPrefix}/`;
  }

  event.path =
    event.path.includes('swagger-ui') &&
    !event.path.startsWith(`/${DocsPrefix}`)
      ? `/${DocsPrefix}${event.path}`
      : event.path;

  console.log('PATH', event.path);

  server = server ?? (await bootstrapLambda());
  return server(event, context, callback);
};

if (process.env.START_SERVER !== undefined) {
  bootstrapServer().catch(Logger.error);
}
