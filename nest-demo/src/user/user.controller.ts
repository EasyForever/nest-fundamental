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
}
