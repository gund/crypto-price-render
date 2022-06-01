import { Injectable } from '@nestjs/common';

export interface WrapInHtmlOptions {
  title?: string;
  extraHead?: string;
  ctx?: WrapInHtmlContext;
}

export interface WrapInHtmlContext {
  data: unknown;
  req: unknown;
  res: unknown;
}

@Injectable()
export class WrapInHtmlService {
  wrap(body: string, options?: WrapInHtmlOptions) {
    options = this.interpolateOptions(options);

    return `<html>
<head>
  <title>${options?.title ?? ''}</title>${options?.extraHead ?? ''}
</head>
<body>${body}</body>
</html>`;
  }

  private interpolateOptions(options?: WrapInHtmlOptions) {
    if (!options || !options.ctx) {
      return options;
    }

    const newOptions = { ...options };

    for (const [key, value] of Object.entries(newOptions)) {
      if (typeof value !== 'string') {
        continue;
      }

      (newOptions as any)[key] = value.replace(/\$\{([^}]+)\}/g, (_, path) =>
        this.getByPath(options.ctx, path)
      );
    }

    return newOptions;
  }

  private getByPath(obj: unknown, path: string) {
    const parts = path.split('.');
    return parts.reduce((val, part) => val?.[part], obj as any);
  }
}
