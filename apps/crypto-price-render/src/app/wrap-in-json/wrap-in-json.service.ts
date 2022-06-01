import { Injectable } from '@nestjs/common';

export interface WrapInJsonOptions {
  key?: string;
}

@Injectable()
export class WrapInJsonService {
  wrap(data: unknown, options?: WrapInJsonOptions) {
    return options?.key ? { [options.key]: data } : data;
  }
}
