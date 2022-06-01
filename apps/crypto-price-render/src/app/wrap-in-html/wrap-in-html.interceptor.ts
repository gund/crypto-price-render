import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { getWrapInHtmlMetadata } from './wrap-in-html.decorator';
import { WrapInHtmlService } from './wrap-in-html.service';

@Injectable()
export class WrapInHtmlInterceptor implements NestInterceptor {
  constructor(private readonly wrapInHtmlService: WrapInHtmlService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    const controllerType = context.getClass();
    const controllerMethod = context.getHandler();
    const metadata = getWrapInHtmlMetadata(controllerType);
    const options = metadata?.[controllerMethod.name];

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
