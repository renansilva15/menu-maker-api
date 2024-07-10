import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The name of the Product',
    example: 'Product Name',
  })
  @IsEmail()
  to: string;

  @ApiProperty({
    description: 'The description of the Product',
    example: 'This is a product description.',
  })
  @IsString()
  @IsNotEmpty()
  order: string;
}
