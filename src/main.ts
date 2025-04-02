import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './core/middlewares/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const CONFIG_SERVICE = app.get(ConfigService);

  app.use(cookieParser());

  app.enableCors({
    origin: CONFIG_SERVICE.get<string[]>('allowedUrls'),
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api/v1');
  await app.listen(CONFIG_SERVICE.get<number>('port'));
}
bootstrap();
