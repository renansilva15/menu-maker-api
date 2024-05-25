import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from '../hash.service';

describe('HashService', () => {
  let hashService: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService,
        {
          provide: 'SALT_ROUNDS',
          useValue: 1,
        },
      ],
    }).compile();

    hashService = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(hashService).toBeDefined();
  });
});
