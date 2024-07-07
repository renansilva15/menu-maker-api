import { Controller, Get } from '@nestjs/common';
import { StablishmentsService } from './stablishments.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stablishments')
@Controller('stablishments')
export class StablishmentsController {
  constructor(private readonly stablishmentsService: StablishmentsService) {}

  @Get()
  findAll() {
    return this.stablishmentsService.findAll();
  }
}
