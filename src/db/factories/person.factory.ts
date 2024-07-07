import { setSeederFactory } from 'typeorm-extension';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';
import { HashService } from 'src/common/modules/hash/hash.service';

export default setSeederFactory(PersonEntity, async (faker) => {
  const hashService = new HashService(1);

  const person = new PersonEntity();
  person.cpf = faker.string.numeric(11);
  person.email = faker.internet.email({
    firstName: person.firstName,
    lastName: person.lastName,
  });
  person.password = await hashService.hash('Password123@');
  person.firstName = faker.person.firstName();
  person.lastName = faker.person.lastName();
  person.isEmailVerified = true;
  person.isFirstLogin = false;
  person.isBanned = false;

  return person;
});
