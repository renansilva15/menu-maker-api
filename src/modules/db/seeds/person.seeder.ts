import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';

export default class PersonSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const personFactory = factoryManager.get(PersonEntity);

    await personFactory.save({
      isEmailVerified: false,
      isFirstLogin: true,
    });

    await personFactory.save({
      isFirstLogin: true,
    });

    await personFactory.saveMany(5);
  }
}
