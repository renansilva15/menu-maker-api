import { DefaultEntity } from 'src/common/entities/default.entity';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum TokenPurpose {
  VERIFY_EMAIL = 'verify-email',
  PASSWORD_RECOVERY = 'password-recovery',
}

@Entity({ name: 'tokens' })
export class TokenEntity extends DefaultEntity<TokenEntity> {
  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column({ name: 'purpose' })
  purpose: TokenPurpose;

  @Column({ name: 'person_id' })
  personId: string;

  @ManyToOne(() => PersonEntity, (person) => person.tokens)
  @JoinColumn({ name: 'person_id' })
  person: PersonEntity;
}
