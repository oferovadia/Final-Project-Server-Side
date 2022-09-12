import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class OrderDTO {
  @IsNotEmpty()
  order_date: Date;

  @IsNotEmpty()
  required_date: Date;

  @IsNotEmpty()
  shipped_date: Date;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  postal_code: string;

  @IsNotEmpty()
  phone: string;
}
