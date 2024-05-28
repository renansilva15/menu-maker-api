import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from './dto/create-person.dto';
import { CPFTransformInterceptor } from 'src/common/interceptors/cpf-transform.interceptor';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @UseInterceptors(CPFTransformInterceptor)
  create(@Body(ValidationPipe) createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personsService.findAll();
  }
}
