import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

export interface CmcQuoteOptions {
  convert?: string;
}

@Injectable()
export class CmcService {
  constructor(private readonly http: HttpService) {}

  fetchSymbolQuote(symbol: string, options?: CmcQuoteOptions) {
    return this.http
      .get('v2/cryptocurrency/quotes/latest', {
        params: {
          symbol,
          convert: options?.convert,
        },
      })
      .pipe(map((res) => res.data));
  }

  fetchSymbolPrice(symbol: string, options?: CmcQuoteOptions) {
    const convert = options?.convert ?? 'USD';

    return this.fetchSymbolQuote(symbol, options).pipe(
      map((quote) => quote.data[symbol][0].quote[convert].price)
    );
  }
}
