import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();

// gestion api management => creer des api et les vendre en limitant les acces par un token que nous seul peut le creer
