import { setSeederFactory } from 'typeorm-extension';
import PersonFactory from './person.factory';
import { OwnerEntity } from 'src/modules/owners/entities/owner.entity';

export default setSeederFactory(OwnerEntity, (faker) => {
  const person = PersonFactory.factoryFn(faker, null);

  const owner = new OwnerEntity();
  owner.person = person;
  owner.personId = person.id;

  return owner;
});
