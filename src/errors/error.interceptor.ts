import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorInterceptor implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();
      response.status(status).json({
        status,
        message,
      });
    } else {
      if (exception.message.includes('duplicate key')) {
        response.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: 'Email already in use',
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        });
      }
    }
  }
}
