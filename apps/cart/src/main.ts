import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  await app.listen(configService.get('HTTP_PORT_CART'));
}
bootstrap();
