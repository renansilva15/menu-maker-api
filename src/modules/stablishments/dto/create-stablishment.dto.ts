import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStablishmentDto {
  @ApiProperty({
    description: 'The name of the Stablishment',
    example: "Moe's Bar",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
