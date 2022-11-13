import { SetMetadata, Type, UseInterceptors } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { chainMethodDecorators } from '../util/chain-decorators';
import { WrapInJsonInterceptor } from './wrap-in-json.interceptor';
import { WrapInJsonOptions } from './wrap-in-json.service';

const METADATA_KEY = Symbol('WrapInJson');

export function WrapInJson(options?: WrapInJsonOptions) {
  return chainMethodDecorators(
    UseInterceptors(WrapInJsonInterceptor),
    SetMetadata(METADATA_KEY, options)
  );
}

export function getWrapInJsonMetadata(
  reflector: Reflector,
  target: Function | Type<unknown>
) {
  return reflector.get<WrapInJsonOptions | undefined>(METADATA_KEY, target);
}
