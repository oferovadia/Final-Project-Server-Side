import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //To configure Fastify, which is Express competitor:
  // const app = await NestFactory.create<NestFastifyApplication>(
  // AppModule,
  // new FastifyAdapter(),
  // );
  app.use(
    session({
      secret: 'ofer',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true, origin: true });
  await app.listen(3000);
}
bootstrap();
