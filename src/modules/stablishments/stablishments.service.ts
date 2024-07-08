import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StablishmentEntity } from './entities/stablishment.entity';
import { Repository } from 'typeorm';
import { CreateStablishmentDto } from './dto/create-stablishment.dto';
import { OwnersService } from '../owners/owners.service';
import { PersonEntity } from '../persons/entities/person.entity';

const BASESLUG = 'stablishment';

@Injectable()
export class StablishmentsService {
  constructor(
    @InjectRepository(StablishmentEntity)
    private readonly stablishmentRepository: Repository<StablishmentEntity>,
    private readonly ownersService: OwnersService,
  ) {}

  private async getSlug(): Promise<string> {
    const stablishments = await this.stablishmentRepository.find({
      select: {
        slug: true,
      },
    });

    const stablishmentSlugs = stablishments.map(
      (stablishment) => stablishment.slug,
    );

    let count = stablishmentSlugs.length + 1;
    let slug = `${BASESLUG}${count}`;

    while (stablishmentSlugs.includes(slug)) {
      count++;
      slug = `${BASESLUG}${count}`;
    }

    return slug;
  }

  async create(
    { owner: { id: ownerId } }: PersonEntity,
    createStablishmentDto: CreateStablishmentDto,
  ): Promise<StablishmentEntity> {
    const stablishmentAlreadyExists = await this.stablishmentRepository.findOne(
      {
        where: { name: createStablishmentDto.name },
      },
    );

    if (stablishmentAlreadyExists) {
      throw new ConflictException(
        `Name ${createStablishmentDto.name} already exists`,
      );
    }

    const slug = await this.getSlug();

    return this.stablishmentRepository.save(
      this.stablishmentRepository.create({
        ...createStablishmentDto,
        ownerId,
        slug,
      }),
    );
  }

  async findAll() {
    return this.stablishmentRepository.find();
  }

  async findOne(id: string) {
    const stablishment = await this.stablishmentRepository.findOne({
      where: { id },
    });

    if (!stablishment) {
      throw new NotFoundException(`Stablishment with ID ${id} not found`);
    }

    return stablishment;
  }
}
