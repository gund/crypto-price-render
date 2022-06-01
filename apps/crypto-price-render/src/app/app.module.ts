import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmcModule } from './cmc/cmc.module';
import { WrapInHtmlService } from './wrap-in-html/wrap-in-html.service';
import { WrapInJsonModule } from './wrap-in-json/wrap-in-json.module';

@Module({
  imports: [CmcModule, WrapInJsonModule],
  controllers: [AppController],
  providers: [AppService, WrapInHtmlService],
})
export class AppModule {}
