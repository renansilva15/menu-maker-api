import { setSeederFactory } from 'typeorm-extension';
import PersonFactory from './person.factory';
import { OwnerEntity } from 'src/modules/owners/entities/owner.entity';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';
import { dataSource } from '../data-source';

export default setSeederFactory(OwnerEntity, async (faker) => {
  const personRepository = dataSource.getRepository(PersonEntity);

  const person = await PersonFactory.factoryFn(faker, null);

  await personRepository.save(person);

  const owner = new OwnerEntity();
  owner.person = person;
  owner.personId = person.id;

  return owner;
});
