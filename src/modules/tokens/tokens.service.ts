import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}
}
