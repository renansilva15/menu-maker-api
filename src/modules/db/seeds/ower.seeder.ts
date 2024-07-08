import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';
import { OwnerEntity } from 'src/modules/owners/entities/owner.entity';
import { StablishmentEntity } from 'src/modules/stablishments/entities/stablishment.entity';

export default class OwerSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const personFactory = factoryManager.get(PersonEntity);
    const owerFactory = factoryManager.get(OwnerEntity);
    const stablishmentFactory = factoryManager.get(StablishmentEntity);

    const person = await personFactory.save({
      firstName: 'The Man',
      email: 'theman@example.com',
    });

    const owner = await owerFactory.save({
      person,
    });

    await owerFactory.saveMany(5);

    await stablishmentFactory.save({ owner });

    await stablishmentFactory.saveMany(5);
  }
}
