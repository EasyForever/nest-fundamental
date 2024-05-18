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
import { OtherModule } from './other/other.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbTestModule } from './db-test/db-test.module';

@Module({
  imports: [
    UserModule,
    ListModule,
    UploadModule,
    LoginModule,
    SpiderModule,
    GuardModule,
    OtherModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234qwer.',
      database: 'nest-demo',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryAttempts: 5,
      retryDelay: 3000,
      autoLoadEntities: true
    }),
    DbTestModule
  ],
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
