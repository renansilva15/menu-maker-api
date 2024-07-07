import { DefaultEntity } from 'src/common/entities/default.entity';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';
import { StablishmentEntity } from 'src/modules/stablishments/entities/stablishment.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'owners' })
export class OwnerEntity extends DefaultEntity<OwnerEntity> {
  @Column({ name: 'person_id' })
  personId: string;

  @OneToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id' })
  person: PersonEntity;

  @OneToMany(() => StablishmentEntity, (stablishment) => stablishment.owner)
  stablishments: StablishmentEntity[];
}
