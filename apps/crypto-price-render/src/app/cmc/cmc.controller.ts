import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
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
  ApiQuery({
    name: 'currency',
    required: false,
    description: 'Display price in specific currency. By default in USD',
    example: 'eur',
  })
);

const GetPriceHtml = chainMethodDecorators(
  UseInterceptors(WrapInHtmlInterceptor),
  WrapInHtml({ title: '${data}' }),
  ApiProduces('text/html'),
  ApiOkResponse({
    type: String,
    description: 'HTML containing a price of the symbol',
  }),
  GetPriceApiDocs
);

class GetPriceJsonResponse {
  @ApiProperty()
  price?: number;
}

const GetPriceJson = chainMethodDecorators(
  UseInterceptors(WrapInJsonInterceptor),
  WrapInJson({ key: 'price' }),
  ApiOkResponse({
    type: GetPriceJsonResponse,
    description: 'JSON containing a price of the symbol',
  }),
  GetPriceApiDocs
);

@Controller('cmc')
@UseInterceptors(CacheInterceptor)
export class CmcController {
  constructor(private readonly cmcService: CmcService) {}

  @Get('price/:symbol')
  @GetPriceHtml
  @ApiParam({
    name: 'symbol',
    description: 'Symbol name to display',
    example: 'btc',
  })
  getPriceHtml(
    @Param('symbol', UpperCasePipe) symbol: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ symbol, currency });
  }

  @Get('price/:symbol/json')
  @GetPriceJson
  @ApiParam({
    name: 'symbol',
    description: 'Symbol name to display',
    example: 'btc',
  })
  getPriceJson(
    @Param('symbol', UpperCasePipe) symbol: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ symbol, currency });
  }

  @Get('price/id/:id')
  @GetPriceHtml
  @ApiParam({
    name: 'id',
    description: 'Symbol ID to display',
    example: '1',
  })
  getPriceIdHtml(
    @Param('id', UpperCasePipe) id: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ id, currency });
  }

  @Get('price/id/:id/json')
  @GetPriceJson
  @ApiParam({
    name: 'id',
    description: 'Symbol ID to display',
    example: '1',
  })
  getPriceIdJson(
    @Param('id', UpperCasePipe) id: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ id, currency });
  }

  @Get('price/slug/:slug')
  @GetPriceHtml
  @ApiParam({
    name: 'slug',
    description: 'Symbol slug to display',
    example: 'bitcoin',
  })
  getPriceSlugHtml(
    @Param('slug') slug: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ slug, currency });
  }

  @Get('price/slug/:slug/json')
  @GetPriceJson
  @ApiParam({
    name: 'slug',
    description: 'Symbol slug to display',
    example: 'bitcoin',
  })
  getPriceSlugJson(
    @Param('slug') slug: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ slug, currency });
  }
}
