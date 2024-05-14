import { Global, Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { AaaModule } from 'src/aaa/aaa.module';

@Global()
@Module({
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule {}
