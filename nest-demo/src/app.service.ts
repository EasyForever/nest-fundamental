import { Injectable } from '@nestjs/common';
import { OtherService } from './other/other.service';
@Injectable()
export class AppService {
  constructor(private readonly otherService: OtherService) {}

  getHello(): string {
    return 'Hello World!' + this.otherService.xxx();
  }
}
