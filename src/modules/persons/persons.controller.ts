import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
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

  @Post('verify-email/:id/:token')
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'UUID',
    description: 'Person ID used for email verification',
    example: '0e174f42-d589-453b-9c65-beead600bac3',
  })
  @ApiParam({
    name: 'token',
    type: 'string',
    format: 'UUID',
    description: 'Token ID associated with the email verification process',
    example: '0e174f42-d589-453b-9c65-beead600bac3',
  })
  verifyEmail(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('token', ParseUUIDPipe) token: string,
  ) {
    return this.personsService.verifyEmail(id, token);
  }

  @Get()
  findAll() {
    return this.personsService.findAll();
  }
}
