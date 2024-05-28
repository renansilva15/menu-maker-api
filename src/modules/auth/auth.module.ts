import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalOwnerStrategy } from './strategies/local-owner.strategy';
import { PersonsModule } from '../persons/persons.module';
import { HashModule } from 'src/common/modules/hash/hash.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    PersonsModule,
    HashModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalOwnerStrategy],
})
export class AuthModule {}
