import { DefaultEntity } from 'src/common/entities/default.entity';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'owners' })
export class OwnerEntity extends DefaultEntity<OwnerEntity> {
  @Column({ name: 'person_id' })
  personId: string;

  @OneToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id' })
  person: PersonEntity;
}
