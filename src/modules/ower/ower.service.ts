import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OwerEntity } from './entities/ower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOwerDto } from './dto/create-ower.dto';
import { PersonsService } from '../persons/persons.service';

@Injectable()
export class OwerService {
  constructor(
    @InjectRepository(OwerEntity)
    private readonly owerRepository: Repository<OwerEntity>,
    private readonly personsService: PersonsService,
  ) {}

  async create(createOwerDto: CreateOwerDto): Promise<OwerEntity> {
    const ower = await this.owerRepository.findOne({
      where: {
        person: { id: createOwerDto.personId },
      },
    });

    if (ower) {
      throw new ConflictException(
        `Ower with person ID ${createOwerDto.personId} already exists`,
      );
    }

    const person = await this.personsService.findOne(createOwerDto.personId);

    return this.owerRepository.save(
      this.owerRepository.create({
        personId: createOwerDto.personId,
        person,
      }),
    );
  }

  async findAll(): Promise<OwerEntity[]> {
    return this.owerRepository.find();
  }
}
