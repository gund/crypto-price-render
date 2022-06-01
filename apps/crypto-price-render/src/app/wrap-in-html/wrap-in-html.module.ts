import { Module } from '@nestjs/common';
import { WrapInHtmlService } from './wrap-in-html.service';

@Module({
  providers: [WrapInHtmlService],
  exports: [WrapInHtmlService],
})
export class WrapInHtmlModule {}
