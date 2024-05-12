import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 获取通过SetMetaData设置的role
    // const roles = this.reflector.get<string[]>('role', context.getHandler());

    // 获取通过Role装饰器设置的role
    const roles = this.reflector.get(Role, context.getHandler());

    console.log('经过了role守卫', roles);
    return true;
  }
}
