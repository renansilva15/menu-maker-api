import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PersonsService } from '../persons/persons.service';
import { HashService } from 'src/common/modules/hash/hash.service';
import { PersonEntity } from '../persons/entities/person.entity';
import { JwtService } from '@nestjs/jwt';

type Role = 'owner' | 'customer';

type JWTPayload = {
  sub: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  iat?: number;
  exp?: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly personsService: PersonsService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async ownerLogin(person: PersonEntity): Promise<{ acessToken: string }> {
    const payload: JWTPayload = {
      sub: person.owner.id,
      role: 'owner',
      email: person.email,
      firstName: person.firstName,
      lastName: person.lastName,
    };

    return { acessToken: this.jwtService.sign(payload) };
  }

  async validateOwer(email: string, password: string) {
    const person = await this.personsService.findOneByEmail(email);

    if (!person.owner) {
      throw new NotFoundException(`Owner with email ${email} not found`);
    }

    if (!(await this.hashService.compare(password, person.password))) {
      throw new UnauthorizedException('Password incorrect');
    }

    if (!person.isEmailVerified) {
      await this.personsService.sendVerifyEmail(person);

      throw new ForbiddenException(`Email ${email} has not been verified yet`);
    }

    return { ...person, password: undefined };
  }
}
