import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// import * as dayjs from 'dayjs';
// import * as customParseFormat from 'dayjs/plugin/customParseFormat';

async function bootstrap() {
  // dayjs.extend(customParseFormat);

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(4001);
}
bootstrap();
