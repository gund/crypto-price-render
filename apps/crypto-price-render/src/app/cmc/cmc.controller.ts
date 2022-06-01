import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { UpperCasePipe } from '../upper-case/upper-case.pipe';
import { WrapInHtml } from '../wrap-in-html/wrap-in-html.decorator';
import { WrapInHtmlInterceptor } from '../wrap-in-html/wrap-in-html.interceptor';
import { CmcService } from './cmc.service';

@Controller('cmc')
@UseInterceptors(WrapInHtmlInterceptor)
export class CmcController {
  constructor(private readonly cmcService: CmcService) {}

  @Get('price/:symbol')
  @WrapInHtml({ title: '${req.params.symbol} - ${data}' })
  getPrice(
    @Param('symbol', UpperCasePipe) symbol: string,
    @Query('convert', UpperCasePipe) convert?: string
  ) {
    return this.cmcService.fetchSymbolPrice(symbol, { convert });
  }
}
