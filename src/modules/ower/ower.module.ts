import { Module } from '@nestjs/common';
import { OwerService } from './ower.service';
import { OwerController } from './ower.controller';

@Module({
  controllers: [OwerController],
  providers: [OwerService],
})
export class OwerModule {}
