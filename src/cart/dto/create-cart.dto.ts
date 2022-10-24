import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  customer_id: number;
}
