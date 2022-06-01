import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { getWrapInHtmlMetadata } from './wrap-in-html.decorator';
import { WrapInHtmlService } from './wrap-in-html.service';

@Injectable()
export class WrapInHtmlInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly wrapInHtmlService: WrapInHtmlService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    const options =
      getWrapInHtmlMetadata(this.reflector, context.getHandler()) ??
      getWrapInHtmlMetadata(this.reflector, context.getClass());

    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const ctx = { data, req, res };

        return this.wrapInHtmlService.wrap(data, { ...options, ctx });
      })
    );
  }
}
