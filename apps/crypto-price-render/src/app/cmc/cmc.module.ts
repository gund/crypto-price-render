import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { CmcService } from './cmc.service';
import { CmcController } from './cmc.controller';
import { WrapInHtmlModule } from '../wrap-in-html/wrap-in-html.module';
import { WrapInJsonModule } from '../wrap-in-json/wrap-in-json.module';
import { RayModule } from '../ray/ray.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 0,
      baseURL: environment.cmc.apiUrl,
      headers: { 'X-CMC_PRO_API_KEY': environment.cmc.apiToken ?? 'blank' },
    }),
    CacheModule.register({
      ttl: 30,
      max: 100,
    }),
    WrapInHtmlModule,
    WrapInJsonModule,
    RayModule,
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
