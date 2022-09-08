import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';

export class RegisterCustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'First name must be at least 2 characters' })
  @MinLength(2)
  first_name: string;

  @IsNotEmpty({ message: 'Last name must be at least 2 characters' })
  @MinLength(2)
  last_name: string;

  @IsNotEmpty({ message: 'Password must be at least 8 characters' })
  @MinLength(8)
  password: string;
}
