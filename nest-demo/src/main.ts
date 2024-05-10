import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ResponseInterceptor } from './common/response.interceptor';
import * as session from 'express-session';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 全局中间件
  app.use(new LoggerMiddleware().use);

  // 静态资源服务器
  app.useStaticAssets(join(__dirname, 'files'), { prefix: '/files' });

  // 全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 缓存
  app.use(
    session({
      secret: 'my-secret',
      name: 'xiaoming',
      rolling: true
    })
  );

  // 全局过滤器（http异常过滤器）
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
