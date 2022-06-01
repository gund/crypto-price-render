import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { getWrapInJsonMetadata } from './wrap-in-json.decorator';
import { WrapInJsonService } from './wrap-in-json.service';

@Injectable()
export class WrapInJsonInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly wrapInJsonService: WrapInJsonService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const options =
      getWrapInJsonMetadata(this.reflector, context.getHandler()) ??
      getWrapInJsonMetadata(this.reflector, context.getClass());

    return next
      .handle()
      .pipe(map((data) => this.wrapInJsonService.wrap(data, options)));
  }
}
