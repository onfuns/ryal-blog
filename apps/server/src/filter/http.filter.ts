import { ResponseResult } from '@/common/model/response.model'
import { LoggerService } from '@/shared/logger/logger.service'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new LoggerService('HttpExceptionFilter')

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const success = status >= 200 && status <= 300
    !success && this.logger.error(exception)
    const errorResponse = new ResponseResult(success, null, exception.message)
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
