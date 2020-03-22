import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('./cert/key.pem', 'utf8'),
    cert: readFileSync('./cert/server.crt', 'utf8'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  await app.listen(9615);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
