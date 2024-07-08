import { Module } from '@nestjs/common';
import { StablishmentsService } from './stablishments.service';
import { StablishmentsController } from './stablishments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StablishmentEntity } from './entities/stablishment.entity';
import { OwnersModule } from '../owners/owners.module';

@Module({
  imports: [TypeOrmModule.forFeature([StablishmentEntity]), OwnersModule],
  controllers: [StablishmentsController],
  providers: [StablishmentsService],
})
export class StablishmentsModule {}
