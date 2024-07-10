import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { StablishmentsService } from '../stablishments/stablishments.service';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  CreateProductDto,
  CreateProductWithImageDto,
} from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly stablishmentsService: StablishmentsService,
  ) {}

  @Post(':stablishmentId')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.diskStorage({
        destination(req, file, callback) {
          const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');

          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          callback(null, uploadDir);
        },
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              path.extname(file.originalname),
          );
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException(
              'Only image files (jpg|jpeg|png|gif) are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductWithImageDto })
  @ApiParam({
    name: 'stablishmentId',
    type: 'string',
    format: 'uuid',
    description: 'Stablishment ID used for filtering products',
    example: '0e174f42-d589-453b-9c65-beead600bac3',
    required: true,
  })
  async create(
    @Param('stablishmentId', ParseUUIDPipe) stablishmentId: string,
    @Body(ValidationPipe)
    createProductDto: Omit<CreateProductDto, 'imageUrl' | 'price'> & {
      price: string;
    },
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('File is required');
    }

    if (stablishmentId) {
      await this.stablishmentsService.findOne(stablishmentId);
    }

    const parsedPrice = parseFloat(createProductDto.price);
    if (isNaN(parsedPrice)) {
      throw new BadRequestException('Price must be a number');
    }

    const imageUrl = `/uploads/${image.filename}`;

    return this.productsService.create(stablishmentId, {
      ...createProductDto,
      price: parsedPrice,
      imageUrl,
    });
  }

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
    @Param('stablishmentId', ParseUUIDPipe) stablishmentId: string,
  ) {
    console.log(stablishmentId);

    if (stablishmentId) {
      await this.stablishmentsService.findOne(stablishmentId);
    }

    return this.productsService.findAll(stablishmentId);
  }

  @Post('create-order')
  createOrder(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    return this.productsService.createOrder(createOrderDto);
  }
}
