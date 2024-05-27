import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  providers: [TokensService],
})
export class TokensModule {}
