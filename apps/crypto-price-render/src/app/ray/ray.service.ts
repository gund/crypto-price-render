import { Inject, Injectable, Logger, Optional } from '@nestjs/common';

/** Returns random number between 0 and 1 */
export type RayRandom = () => number;
export const RayRandom = Symbol('RayRandom');

@Injectable()
export class RayService {
  constructor(
    @Inject(RayRandom)
    @Optional()
    private readonly random: RayRandom = Math.random
  ) {}

  generate(): string {
    const randomStr = this.random()
      // Get 8 numbers after comma
      .toFixed(10)
      // Cut first number with comma
      .slice(2);

    return `RayId:${randomStr}`;
  }

  getLogger(prefix = ''): Logger {
    const rayId = this.generate();

    return new Logger(`{${rayId}} ${prefix}`);
  }
}
