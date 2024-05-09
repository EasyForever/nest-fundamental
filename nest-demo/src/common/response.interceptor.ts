import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface IData<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<IData<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: '操作成功',
          success: true
        };
      })
    );
  }
}
