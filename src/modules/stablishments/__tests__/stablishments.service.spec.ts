import { Test, TestingModule } from '@nestjs/testing';
import { StablishmentsService } from '../stablishments.service';

describe('StablishmentsService', () => {
  let service: StablishmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StablishmentsService],
    }).compile();

    service = module.get<StablishmentsService>(StablishmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
