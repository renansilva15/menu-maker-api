import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOwerDto {
  @ApiProperty({
    description: 'The person ID to be associated with the ower',
    example: '0e174f42-d589-453b-9c65-beead600bac3',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  personId: string;
}
