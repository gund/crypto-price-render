import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmcModule } from './cmc/cmc.module';
import { WrapInHtmlService } from './wrap-in-html/wrap-in-html.service';

@Module({
  imports: [CmcModule],
  controllers: [AppController],
  providers: [AppService, WrapInHtmlService],
})
export class AppModule {}
