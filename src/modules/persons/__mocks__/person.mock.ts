import { PersonEntity } from '../entities/person.entity';

export const personEntityMock: PersonEntity = {
  id: 'fd40f344-3e1e-4cf5-81ec-bd4e8fd590d7',
  createdAt: new Date(),
  updatedAt: new Date(),
  cpf: '11144477735',
  email: 'johndoe@example.com',
  password: '$2a$10$JvFEyOD8j.7ndnmYiOOB4.9FPaIKCxDeFyrnXTPp9eDxnvu/nGzfe',
  firstName: 'John',
  lastName: 'Doe',
  isEmailVerified: false,
  isFirstLogin: true,
  isBanned: false,
} as PersonEntity;
