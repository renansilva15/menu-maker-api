import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsCPF } from 'src/common/decorators/is-cpf.decorator';

export class CreatePersonDto {
  @ApiProperty({
    description:
      'CPF (Cadastro de Pessoas Físicas) is the Brazilian individual taxpayer registry identification',
    example: '111.444.777-35',
  })
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  cpf: string;

  @ApiProperty({
    description: 'Email address of the person',
    example: 'example@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Strong password for the person. Must include uppercase, lowercase, numbers, and special characters',
    example: 'Password123@',
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'First name of the person',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the person',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
