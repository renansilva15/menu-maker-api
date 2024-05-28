import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonsService } from '../persons/persons.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    @Inject(forwardRef(() => PersonsService))
    private readonly personService: PersonsService,
  ) {}

  async create(createTokenDto: CreateTokenDto): Promise<TokenEntity> {
    const person = await this.personService.findOne(createTokenDto.id);

    const expiresAt =
      createTokenDto.expiresAt ?? new Date(Date.now() + 60 * 60 * 1000);

    return this.tokenRepository.save(
      this.tokenRepository.create({ ...createTokenDto, person, expiresAt }),
    );
  }
}
