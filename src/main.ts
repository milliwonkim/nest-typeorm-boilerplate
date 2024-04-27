import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Books Example')
    .setDescription('The Books API Description')
    .setVersion('1.0.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'api.json',
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
