import { setSeederFactory } from 'typeorm-extension';
import OwnerFactory from './owner.factory';
import { StablishmentEntity } from 'src/modules/stablishments/entities/stablishment.entity';
import { OwnerEntity } from 'src/modules/owners/entities/owner.entity';
import { dataSource } from '../data-source';

export default setSeederFactory(StablishmentEntity, async (faker) => {
  const ownerRepository = dataSource.getRepository(OwnerEntity);

  const owner = await OwnerFactory.factoryFn(faker, null);

  await ownerRepository.save(owner);

  const stablishment = new StablishmentEntity();
  stablishment.owner = owner;
  stablishment.ownerId = owner.id;
  stablishment.name = faker.company.name();
  stablishment.slug = `stablishment${faker.number.int({ min: 0, max: 9999 })}`;

  return stablishment;
});
