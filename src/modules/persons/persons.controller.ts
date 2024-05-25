import { Controller, Get } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get()
  findAll() {
    return this.personsService.findAll();
  }
}
