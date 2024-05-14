import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { DddService } from './ddd.service';
import { DddController } from './ddd.controller';

@Module({
  controllers: [DddController],
  providers: [DddService],
})
export class DddModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('ddd Module onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('ddd Module onApplicationBootstrap');
  }
}
