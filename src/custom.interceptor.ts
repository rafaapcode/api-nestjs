import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createdAt: data.created_at,
        };

        Reflect.defineProperty(response, 'updated_at', null);
        Reflect.defineProperty(response, 'created_at', null);
        return data;
      }),
    );
  }
}
