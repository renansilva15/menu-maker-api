import { DefaultEntity } from 'src/common/entities/default.entity';
import { PersonEntity } from 'src/modules/persons/entities/person.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'owers' })
export class OwerEntity extends DefaultEntity<OwerEntity> {
  @Column({ name: 'person_id' })
  personId: string;

  @OneToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id' })
  person: PersonEntity;
}
