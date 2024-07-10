import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { StablishmentsService } from '../stablishments/stablishments.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly stablishmentsService: StablishmentsService,
  ) {}

  // TODO: Research about swagger dashed param
  @Get(':stablishmentId')
  @ApiParam({
    name: 'stablishmentId',
    type: 'string',
    format: 'uuid',
    description: 'Stablishment ID used for filtering products',
    example: '0e174f42-d589-453b-9c65-beead600bac3',
    required: false,
  })
  async findAll(
    // TODO: ParseOptionalUUID
    @Param('stablishmentId', ParseUUIDPipe)
    stablishmentId?: string,
  ) {
    if (stablishmentId) {
      await this.stablishmentsService.findOne(stablishmentId);
    }

    return this.productsService.findAll(stablishmentId);
  }
}
