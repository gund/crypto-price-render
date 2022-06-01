import { Module } from '@nestjs/common';
import { WrapInJsonService } from './wrap-in-json.service';

@Module({
  providers: [WrapInJsonService],
  exports: [WrapInJsonService],
})
export class WrapInJsonModule {}
