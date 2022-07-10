import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PORT } from "./config";
import {HttpExceptionFilter} from "./helpers/exeptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const exceptionFilter = new HttpExceptionFilter();
  app.useGlobalFilters(exceptionFilter);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
bootstrap();