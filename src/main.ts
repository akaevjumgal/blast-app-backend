import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from './common/http-exception.filter'

(async () => {
  const PORT = 3000
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('/api/v1')
  app.useGlobalFilters(new HttpExceptionFilter())

  const options = new DocumentBuilder()
    .setTitle('Blast App')
    .setDescription('Blast App API description')
    .setVersion('1.0')
    .addTag('Blast App')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  app.enableCors()
  await app.listen(PORT)
})()
