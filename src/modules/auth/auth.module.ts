import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalOwnerStrategy } from './strategies/local-owner.strategy';
import { PersonsModule } from '../persons/persons.module';
import { HashModule } from 'src/common/modules/hash/hash.module';

@Module({
  imports: [PersonsModule, HashModule],
  controllers: [AuthController],
  providers: [AuthService, LocalOwnerStrategy],
})
export class AuthModule {}
