import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Name should be provided' })
  @MinLength(3)
  first_name: string;

  @IsNotEmpty({ message: 'Name should be provided' })
  @MinLength(3)
  last_name: string;

}
