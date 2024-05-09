import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Headers, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IncomingHttpHeaders } from 'http';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query) {
    return [
      { name: '小满', age: 19 },
      { name: '小明', age: 18 },
      { name: '小红', age: 19 }
    ];
  }

  @Post()
  create(@Body('name') name: string, @Body('aaa') age: number, @Headers() headers: IncomingHttpHeaders) {
    console.log(name, age, headers);

    return {
      code: 200,
      message: name
    };
  }
}
