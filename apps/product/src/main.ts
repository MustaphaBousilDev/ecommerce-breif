import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.enableCors({
    origin: 'http://localhost:5000', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Enable credentials
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(5004);
}
bootstrap();
