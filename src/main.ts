import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = new ConfigService();
  app.enableCors();
  await app.listen(configService.get('PORT') || '3000');
}
bootstrap();
