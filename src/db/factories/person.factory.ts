import { setSeederFactory } from 'typeorm-extension';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';

export default setSeederFactory(PersonEntity, (faker) => {
  const person = new PersonEntity();
  person.cpf = faker.string.numeric(11);
  person.email = faker.internet.email({
    firstName: person.firstName,
    lastName: person.lastName,
  });
  person.password = faker.internet.password();
  person.firstName = faker.person.firstName();
  person.lastName = faker.person.lastName();
  person.isEmailVerified = true;
  person.isFirstLogin = false;
  person.isBanned = false;

  return person;
});
