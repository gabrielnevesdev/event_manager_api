import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeORMConfig } from './TypeORMConfig';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(TypeORMConfig, new ExpressAdapter());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
