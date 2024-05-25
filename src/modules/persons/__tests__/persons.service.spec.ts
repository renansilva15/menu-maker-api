import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from '../persons.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonEntity } from '../entities/person.entity';
import { personEntityMock } from '../__mocks__/person.mock';

describe('PersonsService', () => {
  let personsService: PersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    personsService = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(personsService).toBeDefined();
  });

  it('should return all persons', async () => {
    // Act
    const result = await personsService.findAll();

    // Assert
    expect(result).toEqual(personEntityMock);
  });
});
