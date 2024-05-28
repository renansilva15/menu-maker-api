import { Module } from '@nestjs/common';
import { OwerService } from './ower.service';
import { OwerController } from './ower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwerEntity } from './entities/ower.entity';
import { PersonsModule } from '../persons/persons.module';

@Module({
  imports: [TypeOrmModule.forFeature([OwerEntity]), PersonsModule],
  controllers: [OwerController],
  providers: [OwerService],
})
export class OwerModule {}
