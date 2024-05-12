import { IsInt, IsString, Length, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString()
  @Length(5, 10, { message: '账号长度在5-10之间' })
  name: string;

  @IsNumber()
  @IsInt()
  age: number;
}
