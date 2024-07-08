import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StablishmentsService } from './stablishments.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateStablishmentDto } from './dto/create-stablishment.dto';
import { JwtOwnerAuthGuard } from '../auth/guards/jwt-owner-auth.guard';
import { PersonEntity } from '../persons/entities/person.entity';
import { Request as ExpressRequest } from 'express';

@ApiTags('stablishments')
@Controller('stablishments')
export class StablishmentsController {
  constructor(private readonly stablishmentsService: StablishmentsService) {}

  @Post()
  @ApiBearerAuth('owner-access-token')
  @UseGuards(JwtOwnerAuthGuard)
  create(
    @Request() req: ExpressRequest & { user: PersonEntity },
    @Body(ValidationPipe) createStablishmentDto: CreateStablishmentDto,
  ) {
    return this.stablishmentsService.create(req.user, createStablishmentDto);
  }

  @Get()
  @ApiBearerAuth('owner-access-token')
  @UseGuards(JwtOwnerAuthGuard)
  findAll() {
    return this.stablishmentsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'UUID',
    description: 'Stablishment ID',
    example: '0e174f42-d589-453b-9c65-beead600bac3',
  })
  @ApiBearerAuth('owner-access-token')
  @UseGuards(JwtOwnerAuthGuard)
  findOne(@Param(ParseUUIDPipe) id: string) {
    return this.stablishmentsService.findOne(id);
  }
}
