import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    HashService,
    {
      provide: 'SALT_ROUNDS',
      useFactory: async (configService: ConfigService) =>
        Number(configService.get('SALT_ROUNDS')),
      inject: [ConfigService],
    },
  ],
  exports: [HashService],
})
export class HashModule {}
