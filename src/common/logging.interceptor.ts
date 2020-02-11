import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Request, Response } from 'express'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const {method, url} = context.switchToHttp().getRequest<Request>()
    const { statusCode } = context.switchToHttp().getResponse<Response>()
    const now = Date.now()
    const className = context.getClass().name

    return next
      .handle()
      .pipe(
        tap(() => Logger.log(`${statusCode} ${method} ${url} ${Date.now() - now}ms`, className))
      )
  }
}
