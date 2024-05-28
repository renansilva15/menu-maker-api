import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { OwnersService } from './owners.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('owners')
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  async create(@Body(ValidationPipe) createOwnerDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnerDto);
  }

  @Get()
  async findAll() {
    return this.ownersService.findAll();
  }
}
