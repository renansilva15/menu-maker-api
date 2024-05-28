import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsOptional,
  IsDate,
} from 'class-validator';
import { TokenPurpose } from '../entities/token.entity';

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsEnum(TokenPurpose)
  purpose: TokenPurpose;

  @IsOptional()
  @IsDate()
  expiresAt?: Date;
}
