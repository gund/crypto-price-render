import { WrapInHtmlOptions } from './wrap-in-html.service';

const METADATA_KEY = Symbol('WrapInHtml');

interface ObjWithMetadata extends Object {
  [METADATA_KEY]?: WrapInHtmlMetadata;
}

type WrapInHtmlMetadata = Record<string, WrapInHtmlOptions>;

export function WrapInHtml(options: WrapInHtmlOptions): MethodDecorator {
  return (target: ObjWithMetadata, propertyKey) => {
    const metadata =
      target[METADATA_KEY] || (target[METADATA_KEY] = Object.create(null));

    metadata[propertyKey] = options;
  };
}

export function getWrapInHtmlMetadata(target: unknown) {
  return (target as any)?.prototype?.[METADATA_KEY];
}
