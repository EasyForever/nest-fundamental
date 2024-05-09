import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('我来了，嘿嘿嘿~', req.originalUrl);

    res.send('我被拦截了');
    // next();
  }
}
