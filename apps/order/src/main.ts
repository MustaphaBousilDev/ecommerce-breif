import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(OrderModule);
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  });
  
  await app.listen(5002);
}
bootstrap();
