import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from '../persons.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonEntity } from '../entities/person.entity';
import { personEntityMock } from '../__mocks__/person.mock';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PersonsService', () => {
  let personsService: PersonsService;
  let personsRepository: Repository<PersonEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonsService,
        {
          provide: getRepositoryToken(PersonEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([personEntityMock]),
            findOne: jest.fn().mockResolvedValue(personEntityMock),
          },
        },
      ],
    }).compile();

    personsService = module.get<PersonsService>(PersonsService);
    personsRepository = module.get<Repository<PersonEntity>>(
      getRepositoryToken(PersonEntity),
    );
  });

  it('should be defined', () => {
    expect(personsService).toBeDefined();
    expect(personsRepository).toBeDefined();
  });

  it('should return all persons', async () => {
    // Act
    const result = await personsService.findAll();

    // Assert
    expect(result).toEqual([personEntityMock]);
  });

  it('should return a person by ID', async () => {
    // Arrange
    const id = personEntityMock.id;

    // Act
    const result = await personsService.findOne(id);

    // Assert
    expect(result).toEqual(personEntityMock);
  });

  it('should not return a person by ID by throwing a not found exception', async () => {
    // Arrange
    const id = personEntityMock.id;
    jest.spyOn(personsRepository, 'findOne').mockResolvedValue(null);

    // Act & Assert
    await expect(personsService.findOne(id)).rejects.toThrow(NotFoundException);
  });
});
