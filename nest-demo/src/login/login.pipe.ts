import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log(value, metadata);

    const object = plainToInstance(metadata.metatype, value);

    const errors = await validate(object);

    console.log('object: ', object, 'errors: ', errors);

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
