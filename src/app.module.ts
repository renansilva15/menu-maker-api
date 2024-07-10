import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './modules/db/db.module';
import { PersonsModule } from './modules/persons/persons.module';
import { OwnersModule } from './modules/owners/owners.module';
import { AuthModule } from './modules/auth/auth.module';
import { StablishmentsModule } from './modules/stablishments/stablishments.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DbModule,
    PersonsModule,
    OwnersModule,
    AuthModule,
    StablishmentsModule,
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
