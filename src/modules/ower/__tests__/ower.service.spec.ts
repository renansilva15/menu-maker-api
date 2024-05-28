import { Test, TestingModule } from '@nestjs/testing';
import { OwerService } from '../ower.service';

describe('OwerService', () => {
  let service: OwerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwerService],
    }).compile();

    service = module.get<OwerService>(OwerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
