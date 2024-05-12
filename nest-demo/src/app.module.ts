import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [UserModule, ListModule, UploadModule, LoginModule, SpiderModule, GuardModule],
  controllers: [AppController],
  providers: [
    AppService,
    AppService2,
    {
      provide: 'Shop',
      useValue: ['TB', 'JD', 'PDD']
    },
    {
      provide: 'fff',
      inject: [AppService2],
      useFactory(...args) {
        console.log(args[0].getHello());

        return 123;
      }
    }
  ]
})
export class AppModule {}
