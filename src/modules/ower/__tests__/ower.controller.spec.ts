import { Test, TestingModule } from '@nestjs/testing';
import { OwerController } from '../ower.controller';
import { OwerService } from '../ower.service';

describe('OwerController', () => {
  let controller: OwerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwerController],
      providers: [OwerService],
    }).compile();

    controller = module.get<OwerController>(OwerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
