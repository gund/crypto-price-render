import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { CmcService } from './cmc.service';
import { CmcController } from './cmc.controller';
import { WrapInHtmlModule } from '../wrap-in-html/wrap-in-html.module';
import { WrapInJsonModule } from '../wrap-in-json/wrap-in-json.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 0,
      baseURL: environment.cmc.apiUrl,
      headers: { 'X-CMC_PRO_API_KEY': environment.cmc.apiToken ?? 'blank' },
    }),
    WrapInHtmlModule,
    WrapInJsonModule,
  ],
  controllers: [CmcController],
  providers: [CmcService],
})
export class CmcModule {
  constructor() {
    if (!environment.cmc.apiToken) {
      throw new Error(`Empty CMC apiToken in environment!`);
    }
  }
}
