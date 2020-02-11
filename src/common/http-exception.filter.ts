import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

interface Error {
  statusCode: number
  timestamp: string
  path: string
  method: string
  message: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    const errorResponse: Error = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message.error || exception.message || null
    }

    Logger.error(`${status} ${request.method} ${request.url}`, exception.stack, 'Exception')

    response.status(status).json(errorResponse)
  }
}
