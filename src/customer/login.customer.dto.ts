import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginCustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
