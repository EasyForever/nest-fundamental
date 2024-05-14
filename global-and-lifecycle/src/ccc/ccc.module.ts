import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';
import { ModuleRef } from '@nestjs/core';
import { AaaService } from 'src/aaa/aaa.service';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    console.log('ccc module onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('ccc module onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('ccc module onModuleDestroy');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('ccc module beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal: string) {
    const cccService = this.moduleRef.get<CccService>(CccService);
    console.log('------------------------', cccService.findAll());

    console.log('ccc module onApplicationShutdown', signal);
  }
}
