import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { logError } from '../operators/log-error';

export interface CmcQuoteBase {
  currency?: string;
}

export interface CmcQuoteId extends CmcQuoteBase {
  id: string;
}

export interface CmcQuoteSlug extends CmcQuoteBase {
  slug: string;
}

export interface CmcQuoteSymbol extends CmcQuoteBase {
  symbol: string;
}

export type CmcQuoteOptions = CmcQuoteId | CmcQuoteSlug | CmcQuoteSymbol;

@Injectable()
export class CmcService {
  constructor(private readonly http: HttpService) {}

  fetchSymbolQuote(options: CmcQuoteOptions = {} as any) {
    const id = 'id' in options ? options.id : undefined;
    const slug = 'slug' in options ? options.slug : undefined;
    const symbol = 'symbol' in options ? options.symbol : undefined;
    const convert = options?.currency ?? 'USD';

    return this.http
      .get('v2/cryptocurrency/quotes/latest', {
        params: { id, slug, symbol, convert },
      })
      .pipe(
        map((res) => {
          const data = Object.values<any>(res.data.data)[0];
          const symbol = Array.isArray(data) ? data[0] : data;
          return symbol.quote[convert];
        }),
        logError({ msgPrefix: 'Fetching symbol quote failed:' })
      );
  }

  fetchSymbolPrice(options?: CmcQuoteOptions): Observable<number> {
    return this.fetchSymbolQuote(options).pipe(map((quote) => quote.price));
  }
}
