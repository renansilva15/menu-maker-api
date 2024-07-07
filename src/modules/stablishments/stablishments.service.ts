import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StablishmentEntity } from './entities/stablishment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StablishmentsService {
  constructor(
    @InjectRepository(StablishmentEntity)
    private readonly stablishmentRepository: Repository<StablishmentEntity>,
  ) {}

  async findAll() {
    return this.stablishmentRepository.find();
  }
}
