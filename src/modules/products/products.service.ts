import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StablishmentEntity } from '../stablishments/entities/stablishment.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { MailService } from '../mail/mail.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly mailService: MailService,
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

  async createOrder(createOrderDto: CreateOrderDto): Promise<unknown> {
    return this.mailService.create({ ...createOrderDto, subject: 'Pedido' });
  }
}
