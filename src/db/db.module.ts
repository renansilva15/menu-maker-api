import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource, initializeDatabase } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await initializeDatabase();
        return dataSource.options;
      },
    }),
  ],
})
export class DbModule {}
