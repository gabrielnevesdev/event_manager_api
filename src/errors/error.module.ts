import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorService } from './error.service';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorInterceptor,
    },
    ErrorService,
  ],
  exports: [ErrorService],
})
export class ErrorModule {}
