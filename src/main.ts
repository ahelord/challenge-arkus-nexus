import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import appConfig from './config/app.config';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      // options (same as WinstonModule.forRoot() options)
    }),
  });
  app.setGlobalPrefix('api');
  await app.listen(appConfig.port);
  console.log('listing on ' + (await app.getUrl()));
}
bootstrap();
