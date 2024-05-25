import { DefaultEntity } from 'src/shared/entities/default.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'persons' })
export class PersonEntity extends DefaultEntity<PersonEntity> {
  @Column({ name: 'cpf' })
  cpf: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'pass' })
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'is_email_verified' })
  isEmailVerified: boolean;

  @Column({ name: 'is_first_login' })
  isFirstLogin: boolean;

  @Column({ name: 'is_banned' })
  isBanned: boolean;
}
