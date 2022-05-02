import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const port = 5000;
    await app.listen(port);
    Logger.log(`Application running on port ${port}`);
}
bootstrap();
