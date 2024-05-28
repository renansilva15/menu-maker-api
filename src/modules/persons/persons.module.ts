import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './entities/person.entity';
import { HashModule } from 'src/common/modules/hash/hash.module';
import { TokensModule } from '../tokens/tokens.module';
import { MailModule } from '../mail/mail.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonEntity]),
    HashModule,
    TokensModule,
    MailModule,
  ],
  controllers: [PersonsController],
  providers: [
    PersonsService,
    {
      provide: 'VERIFY_EMAIL_ROUTE',
      useFactory: async (configService: ConfigService) =>
        configService.get('VERIFY_EMAIL_ROUTE'),
      inject: [ConfigService],
    },
  ],
  exports: [PersonsService],
})
export class PersonsModule {}
