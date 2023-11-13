import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  handleHttpException(message: string, status: HttpStatus): HttpException {
    return new HttpException(message, status);
  }

  handleGenericError(status: number, message: string): HttpException {
    return new HttpException(message, status);
  }
}
