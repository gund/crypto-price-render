import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CmcQuoteOptions {
  currency?: string;
}

@Injectable()
export class CmcService {
  constructor(private readonly http: HttpService) {}

  fetchSymbolQuote(symbol: string, options?: CmcQuoteOptions) {
    return this.http
      .get('v2/cryptocurrency/quotes/latest', {
        params: {
          symbol,
          convert: options?.currency,
        },
      })
      .pipe(map((res) => res.data));
  }

  fetchSymbolPrice(
    symbol: string,
    options?: CmcQuoteOptions
  ): Observable<number> {
    const currency = options?.currency ?? 'USD';

    return this.fetchSymbolQuote(symbol, options).pipe(
      map((quote) => quote.data[symbol][0].quote[currency].price)
    );
  }
}
