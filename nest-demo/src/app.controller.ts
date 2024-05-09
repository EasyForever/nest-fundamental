import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('Shop') private readonly shop: string[],
    @Inject('fff') private readonly factory: number
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  test(): string {
    return this.shop[1];
  }

  @Get('test2')
  test2(): number {
    return this.factory;
  }
}
