import { SetMetadata, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WrapInHtmlOptions } from './wrap-in-html.service';

const METADATA_KEY = Symbol('WrapInHtml');

export function WrapInHtml(options: WrapInHtmlOptions) {
  return SetMetadata(METADATA_KEY, options);
}

export function getWrapInHtmlMetadata(
  reflector: Reflector,
  target: Function | Type<unknown>
) {
  return reflector.get<WrapInHtmlOptions | undefined>(METADATA_KEY, target);
}
