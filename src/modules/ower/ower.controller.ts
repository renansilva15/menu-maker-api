import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { OwerService } from './ower.service';
import { CreateOwerDto } from './dto/create-ower.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('owers')
@Controller('ower')
export class OwerController {
  constructor(private readonly owerService: OwerService) {}

  @Post()
  async create(@Body(ValidationPipe) createOwerDto: CreateOwerDto) {
    return this.owerService.create(createOwerDto);
  }

  @Get()
  async findAll() {
    return this.owerService.findAll();
  }
}
