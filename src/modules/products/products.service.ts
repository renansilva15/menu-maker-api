import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StablishmentEntity } from '../stablishments/entities/stablishment.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(
    stablishmentId: StablishmentEntity['id'],
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productRepository.save(
      this.productRepository.create({
        ...createProductDto,
        stablishmentId,
      }),
    );
  }

  async findAll(
    stablishmentId?: StablishmentEntity['id'],
  ): Promise<ProductEntity[]> {
    return this.productRepository.find({ where: { stablishmentId } });
  }
}
