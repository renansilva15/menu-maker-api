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
    const maxRetries = 5;
    const retryDelay = 5000;
    let attempts = 0;

    while (attempts < maxRetries) {
      if (dataSource.isInitialized) {
        console.log('Connection already established.');
        break;
      }

      try {
        await dataSource.initialize();
        console.log('Database connection established.');
        await runSeeders(dataSource);
        break;
      } catch (error) {
        attempts++;
        console.error(`Attempt ${attempts} failed:`, error);

        if (attempts >= maxRetries) {
          console.error(
            'Maximum number of attempts reached. Could not establish database connection.',
          );

          break;
        }

        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }
}
