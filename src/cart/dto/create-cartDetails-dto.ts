import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CartDetailsDto {
  @IsOptional()
  @IsNumber()
  id: number;

//   @IsNotEmpty()
  cart_id: number;

//   @IsNotEmpty()
  product_id: number;

  size: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  total_products_price: number;
}
