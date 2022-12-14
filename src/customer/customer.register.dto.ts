import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterCustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'First name must be at least 2 characters' })
  @MinLength(2)
  firstName: string;

  @IsNotEmpty({ message: 'Last name must be at least 2 characters' })
  @MinLength(2)
  lastName: string;

  @IsNotEmpty({ message: 'Password must be at least 8 characters' })
  @MinLength(8)
  password: string;
}
