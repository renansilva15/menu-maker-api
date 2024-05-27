import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return person;
  }
}
