import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3333;
  const config = new DocumentBuilder()
    .setTitle('Crypto Price Render')
    .setDescription('Render current crypto price as HTML or JSON')
    .setVersion('1.0')
    .addTag('cpr')
    .build();

  app.setGlobalPrefix(globalPrefix);

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

bootstrap();
