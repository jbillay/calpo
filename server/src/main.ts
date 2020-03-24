import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('./cert/key.pem', 'utf8'),
    cert: readFileSync('./cert/server.crt', 'utf8'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('Calpo API')
    .setDescription('API for Calop Application')
    .setVersion('0.1')
    .addTag('calpo')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(configService.get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
