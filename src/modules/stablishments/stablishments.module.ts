import { Module } from '@nestjs/common';
import { StablishmentsService } from './stablishments.service';
import { StablishmentsController } from './stablishments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StablishmentEntity } from './entities/stablishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StablishmentEntity])],
  controllers: [StablishmentsController],
  providers: [StablishmentsService],
})
export class StablishmentsModule {}
