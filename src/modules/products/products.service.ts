import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StablishmentEntity } from '../stablishments/entities/stablishment.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(
    stablishmentId?: StablishmentEntity['id'],
  ): Promise<ProductEntity[]> {
    return this.productRepository.find({ where: { stablishmentId } });
  }
}
