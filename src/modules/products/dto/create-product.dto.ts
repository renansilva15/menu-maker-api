import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { Category } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the Product',
    example: 'Product Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the Product',
    example: 'This is a product description.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The weight or volume of the Product',
    example: '500ml',
  })
  @IsString()
  @IsNotEmpty()
  weightOrVolume: string;

  @ApiProperty({
    description: 'The price of the Product',
    example: 19.99,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'The URL of the Product image',
    example: 'http://example.com/image.jpg',
  })
  @IsUrl()
  imageUrl: string;

  @ApiProperty({
    description: 'The category of the Product',
    example: { name: 'Category Name', path: 'category-path' },
  })
  @IsObject()
  @IsNotEmpty()
  category: Category;
}

export class CreateProductWithImageDto extends OmitType(CreateProductDto, [
  'imageUrl',
] as const) {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file',
  })
  image: any;
}
