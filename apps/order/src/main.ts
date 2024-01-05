import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(OrderModule);
  await app.listen(5002);
}
bootstrap();
