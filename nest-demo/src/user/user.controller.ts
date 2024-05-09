import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  HttpCode,
  Session
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IncomingHttpHeaders } from 'http';
import * as svgCaptcha from 'svg-captcha';
import { RequestOptions } from 'https';
import { Request, Response } from 'express';
import session from 'express-session';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query) {
    console.log(query);
    return {
      code: 200,
      message: query.name
    };
  }

  @Post()
  create(@Body('name') name: string, @Body('aaa') age: number, @Headers() headers: IncomingHttpHeaders) {
    console.log(name, age, headers);

    return {
      code: 200,
      message: name
    };
  }

  @Get('code')
  createCaptcha(@Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966' //背景颜色
    });
    session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('/login')
  login(@Body() body: any, @Session() session) {
    console.log(session, body);
    if (session?.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()) {
      return {
        message: '验证码正确'
      };
    } else {
      return {
        message: '验证码不正确'
      };
    }
  }
}
