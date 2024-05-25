import { Test, TestingModule } from '@nestjs/testing';
import { PersonsController } from '../persons.controller';
import { PersonsService } from '../persons.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { personEntityMock } from '../__mocks__/person.mock';
import { PersonEntity } from '../entities/person.entity';

describe('PersonsController', () => {
  let personsController: PersonsController;
  let personsService: PersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [
        PersonsService,
        {
          provide: getRepositoryToken(PersonEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(personEntityMock),
          },
        },
      ],
    }).compile();

    personsController = module.get<PersonsController>(PersonsController);
    personsService = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(personsController).toBeDefined();
    expect(personsService).toBeDefined();
  });

  it('should return all persons', async () => {
    // Act
    const result = await personsController.findAll();

    // Assert
    expect(result).toEqual(personEntityMock);
  });
});
