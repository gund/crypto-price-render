import { Module } from '@nestjs/common';
import { RayService } from './ray.service';

@Module({
  providers: [RayService],
  exports: [RayService],
})
export class RayModule {}
