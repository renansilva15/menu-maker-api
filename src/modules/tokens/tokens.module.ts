import { Module, forwardRef } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { PersonsModule } from '../persons/persons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    forwardRef(() => PersonsModule),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
