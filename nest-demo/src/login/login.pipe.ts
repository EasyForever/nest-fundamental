import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class LoginPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const fn = metadata.metatype;
    console.log(value, metadata, new fn());
    return value;
  }
}
