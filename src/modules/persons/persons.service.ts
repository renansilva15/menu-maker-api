import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async findAll(): Promise<PersonEntity[]> {
    return this.personRepository.find();
  }
}
