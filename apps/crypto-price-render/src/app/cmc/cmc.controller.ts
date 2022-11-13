import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiProduces,
  ApiProperty,
  ApiQuery,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { UpperCasePipe } from '../upper-case/upper-case.pipe';
import { chainMethodDecorators } from '../util/chain-decorators';
import { WrapInHtml } from '../wrap-in-html/wrap-in-html.decorator';
import { WrapInJson } from '../wrap-in-json/wrap-in-json.decorator';
import { CmcService } from './cmc.service';

const GetPriceApiDocs = chainMethodDecorators(
  ApiQuery({
    name: 'currency',
    required: false,
    description: 'Display price in specific currency. By default in USD',
    example: 'eur',
  })
);

const GetPriceHtmlDocs = chainMethodDecorators(
  WrapInHtml({ title: '${data}' }),
  ApiProduces('text/html'),
  ApiOkResponse({
    type: String,
    description: 'HTML containing a price of the symbol',
  }),
  ApiTooManyRequestsResponse({ description: 'Too many requests' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
  GetPriceApiDocs
);

class GetPriceJsonResponse {
  @ApiProperty()
  price?: number;
}

const GetPriceJsonDocs = chainMethodDecorators(
  WrapInJson({ key: 'price' }),
  ApiOkResponse({
    type: GetPriceJsonResponse,
    description: 'JSON containing a price of the symbol',
  }),
  ApiTooManyRequestsResponse({ description: 'Too many requests' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
  GetPriceApiDocs
);

const SymbolParamDocs = chainMethodDecorators(
  ApiParam({
    name: 'symbol',
    description: 'Symbol name to display',
    example: 'btc',
  })
);

const IdParamDocs = chainMethodDecorators(
  ApiParam({
    name: 'id',
    description: 'Symbol ID to display',
    example: '1',
  })
);

const SlugParamDocs = chainMethodDecorators(
  ApiParam({
    name: 'slug',
    description: 'Symbol slug to display',
    example: 'bitcoin',
  })
);

@Controller('cmc')
@UseInterceptors(CacheInterceptor)
export class CmcController {
  constructor(private readonly cmcService: CmcService) {}

  @Get('price/:symbol')
  @GetPriceHtmlDocs
  @SymbolParamDocs
  getPriceHtml(
    @Param('symbol', UpperCasePipe) symbol: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ symbol, currency });
  }

  @Get('price/:symbol/json')
  @GetPriceJsonDocs
  @SymbolParamDocs
  getPriceJson(
    @Param('symbol', UpperCasePipe) symbol: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ symbol, currency });
  }

  @Get('price/id/:id')
  @GetPriceHtmlDocs
  @IdParamDocs
  getPriceIdHtml(
    @Param('id', UpperCasePipe) id: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ id, currency });
  }

  @Get('price/id/:id/json')
  @GetPriceJsonDocs
  @IdParamDocs
  getPriceIdJson(
    @Param('id', UpperCasePipe) id: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ id, currency });
  }

  @Get('price/slug/:slug')
  @GetPriceHtmlDocs
  @SlugParamDocs
  getPriceSlugHtml(
    @Param('slug') slug: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ slug, currency });
  }

  @Get('price/slug/:slug/json')
  @GetPriceJsonDocs
  @SlugParamDocs
  getPriceSlugJson(
    @Param('slug') slug: string,
    @Query('currency', UpperCasePipe) currency?: string
  ) {
    return this.cmcService.fetchSymbolPrice({ slug, currency });
  }
}
