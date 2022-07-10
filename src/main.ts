import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
bootstrap();