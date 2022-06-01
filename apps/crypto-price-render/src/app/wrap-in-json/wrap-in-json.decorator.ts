import { SetMetadata, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WrapInJsonOptions } from './wrap-in-json.service';

const METADATA_KEY = Symbol('WrapInJson');

export function WrapInJson(options?: WrapInJsonOptions) {
  return SetMetadata(METADATA_KEY, options);
}

export function getWrapInJsonMetadata(
  reflector: Reflector,
  target: Function | Type<unknown>
) {
  return reflector.get<WrapInJsonOptions | undefined>(METADATA_KEY, target);
}
