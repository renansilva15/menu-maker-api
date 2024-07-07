import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';
import { OwnerEntity } from 'src/modules/owners/entities/owner.entity';

export default class OwerSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const personFactory = factoryManager.get(PersonEntity);
    const owerFactory = factoryManager.get(OwnerEntity);

    const person = await personFactory.save({ firstName: 'The Man' });

    await owerFactory.save({
      person,
    });
  }
}
