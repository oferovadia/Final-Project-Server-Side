import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterCustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsNotEmpty({ message: 'Password must be at least 8 characters' })
  @MinLength(8)
  password: string;
}
