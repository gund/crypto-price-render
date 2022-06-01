import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { UpperCasePipe } from '../upper-case/upper-case.pipe';
import { WrapInHtml } from '../wrap-in-html/wrap-in-html.decorator';
import { WrapInHtmlInterceptor } from '../wrap-in-html/wrap-in-html.interceptor';
import { WrapInJson } from '../wrap-in-json/wrap-in-json.decorator';
import { WrapInJsonInterceptor } from '../wrap-in-json/wrap-in-json.interceptor';
import { CmcService } from './cmc.service';

@Controller('cmc')
export class CmcController {
  constructor(private readonly cmcService: CmcService) {}

  @Get('price/:symbol')
  @UseInterceptors(WrapInHtmlInterceptor)
  @WrapInHtml({ title: '${req.params.symbol} - ${data}' })
  getPriceHtml(
    @Param('symbol', UpperCasePipe) symbol: string,
    @Query('convert', UpperCasePipe) convert?: string
  ) {
    return this.cmcService.fetchSymbolPrice(symbol, { convert });
  }

  @Get('price/:symbol/json')
  @UseInterceptors(WrapInJsonInterceptor)
  @WrapInJson({ key: 'price' })
  getPriceJson(
    @Param('symbol', UpperCasePipe) symbol: string,
    @Query('convert', UpperCasePipe) convert?: string
  ) {
    return this.cmcService.fetchSymbolPrice(symbol, { convert });
  }
}
