import { Test, TestingModule } from '@nestjs/testing';
import { StablishmentsController } from '../stablishments.controller';
import { StablishmentsService } from '../stablishments.service';

describe('StablishmentsController', () => {
  let controller: StablishmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StablishmentsController],
      providers: [StablishmentsService],
    }).compile();

    controller = module.get<StablishmentsController>(StablishmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
