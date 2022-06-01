import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiParam,
  ApiProduces,
  ApiProperty,
  ApiQuery,
} from '@nestjs/swagger';
import { UpperCasePipe } from '../upper-case/upper-case.pipe';
import { chainMethodDecorators } from '../util/chain-decorators';
import { WrapInHtml } from '../wrap-in-html/wrap-in-html.decorator';
import { WrapInHtmlInterceptor } from '../wrap-in-html/wrap-in-html.interceptor';
import { WrapInJson } from '../wrap-in-json/wrap-in-json.decorator';
import { WrapInJsonInterceptor } from '../wrap-in-json/wrap-in-json.interceptor';
import { CmcService } from './cmc.service';

const GetPriceApiDocs = chainMethodDecorators(
  ApiParam({
    name: 'symbol',
    description: 'Symbol name to display',
    example: 'btc',
  }),
  ApiQuery({
    name: 'currency',
    required: false,
    description: 'Display price in specific currency. By default in USD',
    example: 'eur',
  })
);

class GetPriceJsonResponse {
  @ApiProperty()
  price?: number;
}

@Controller('cmc')
export class CmcController {
  constructor(private readonly cmcService: CmcService) {}

  @Get('price/:symbol')
  @UseInterceptors(WrapInHtmlInterceptor)
  @WrapInHtml({ title: '${req.params.symbol} - ${data}' })
  @ApiProduces('text/html')
  @ApiOkResponse({
    type: String,
    description: 'HTML containing a price of the symbol',
  })
  @GetPriceApiDocs
  getPriceHtml(
    @Param('symbol', UpperCasePipe) symbol: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice(symbol, { currency });
  }

  @Get('price/:symbol/json')
  @UseInterceptors(WrapInJsonInterceptor)
  @WrapInJson({ key: 'price' })
  @ApiOkResponse({
    type: GetPriceJsonResponse,
    description: 'JSON containing a price of the symbol',
  })
  @GetPriceApiDocs
  getPriceJson(
    @Param('symbol', UpperCasePipe) symbol: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice(symbol, { currency });
  }
}
