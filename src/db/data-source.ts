import 'dotenv/config';
import { DataSourceOptions, DataSource } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../migrations/*.{js,ts}`],
  migrationsRun: true,
  seeds: [`${__dirname}/seeds/**/*{.ts,.js}`],
  factories: [`${__dirname}/factories/**/*{.ts,.js}`],
};

export const dataSource = new DataSource(options);

export async function initializeDatabase() {
  if (process.env.NODE_ENV === 'development') {
    while (true) {
      // TODO: Update to better approach
      try {
        await dataSource.initialize();
        await runSeeders(dataSource);

        break;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
