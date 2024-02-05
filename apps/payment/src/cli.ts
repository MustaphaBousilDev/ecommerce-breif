// src/cli.ts
import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false, // You can turn the logger on if you need
  });
  app.select(CommandModule).get(CommandService).exec();
}

bootstrap();
