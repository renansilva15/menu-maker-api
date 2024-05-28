import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PersonsService } from '../persons/persons.service';
import { HashService } from 'src/common/modules/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly personsService: PersonsService,
    private readonly hashService: HashService,
  ) {}

  async validateOwer(email: string, password: string) {
    const person = await this.personsService.findOneByEmail(email);

    if (!person.owner) {
      throw new NotFoundException(`Owner with email ${email} not found`);
    }

    if (!(await this.hashService.compare(password, person.password))) {
      throw new UnauthorizedException('Password incorrect');
    }

    return { ...person, password: undefined };
  }
}
