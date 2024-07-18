import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.setGlobalPrefix("/api/v1");
  await app.listen(process.env.PORT);
  console.log("Server Start Port:", process.env.PORT);
}
bootstrap();
