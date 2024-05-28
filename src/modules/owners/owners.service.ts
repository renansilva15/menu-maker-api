import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonsService } from '../persons/persons.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { OwnerEntity } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly owerRepository: Repository<OwnerEntity>,
    private readonly personsService: PersonsService,
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<OwnerEntity> {
    const ower = await this.owerRepository.findOne({
      where: {
        person: { id: createOwnerDto.personId },
      },
    });

    if (ower) {
      throw new ConflictException(
        `Owner with person ID ${createOwnerDto.personId} already exists`,
      );
    }

    const person = await this.personsService.findOne(createOwnerDto.personId);

    return this.owerRepository.save(
      this.owerRepository.create({
        personId: createOwnerDto.personId,
        person,
      }),
    );
  }

  async findAll(): Promise<OwnerEntity[]> {
    return this.owerRepository.find();
  }
}
