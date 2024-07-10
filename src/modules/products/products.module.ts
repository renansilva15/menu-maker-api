import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { StablishmentsModule } from '../stablishments/stablishments.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), StablishmentsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
