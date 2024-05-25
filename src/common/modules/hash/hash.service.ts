import { Inject, Injectable } from '@nestjs/common';
import { hash as bcryptHash, compare as bcryptCompare } from 'bcrypt';

@Injectable()
export class HashService {
  constructor(
    @Inject('SALT_ROUNDS')
    private readonly saltRounds: number,
  ) {}

  async hash(data: string | Buffer): Promise<string> {
    return bcryptHash(data, this.saltRounds);
  }

  async compare(data: string | Buffer, encrypted: string) {
    return bcryptCompare(data, encrypted);
  }
}
