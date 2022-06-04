import {
  catchError,
  EMPTY,
  MonoTypeOperatorFunction,
  Observable,
  throwError,
} from 'rxjs';

export interface LogErrorOptions<T> {
  msgPrefix?: string;
  rethrowError?: boolean;
  replaceWith?: Observable<T>;
  log?(...data: unknown[]): void;
}

export function logError<T>({
  msgPrefix,
  rethrowError = true,
  replaceWith = EMPTY,
  log = console.log,
}: LogErrorOptions<T> = {}): MonoTypeOperatorFunction<T> {
  return (o$) =>
    o$.pipe(
      catchError((err) => {
        log(...[msgPrefix, err].filter(Boolean));
        if (rethrowError) {
          return throwError(() => err);
        } else {
          return replaceWith;
        }
      })
    );
}
