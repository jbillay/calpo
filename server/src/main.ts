import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Setup HTTPS 
  const httpsOptions = {
    key: readFileSync('./cert/localhost.key', 'utf8'),
    cert: readFileSync('./cert/localhost.crt', 'utf8'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  // Setup validation mechanism for the application 
  app.useGlobalPipes(new ValidationPipe());

  // Setup configuration for env
  const configService = app.get(ConfigService);

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Calpo API')
    .setDescription('API for Calop Application')
    .setVersion('0.1')
    .addTag('calpo')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  // Manage Cors
  app.enableCors();

  await app.listen(configService.get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
