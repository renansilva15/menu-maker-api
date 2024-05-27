import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    MailService,
    {
      provide: 'MAIL_SERVICE_URL',
      useFactory: async (configService: ConfigService) =>
        configService.get('MAIL_SERVICE_URL'),
      inject: [ConfigService],
    },
  ],
})
export class MailModule {}
