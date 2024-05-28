import { ApiProperty } from '@nestjs/swagger';

export class OwnerLoginDto {
  @ApiProperty({
    description: 'The email of the owner',
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the owner',
    example: 'Password123@',
  })
  password: string;
}
