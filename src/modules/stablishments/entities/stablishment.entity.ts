import { DefaultEntity } from 'src/common/entities/default.entity';
import { OwnerEntity } from 'src/modules/owners/entities/owner.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'stablishments' })
export class StablishmentEntity extends DefaultEntity<StablishmentEntity> {
  @Column({ name: 'nm' })
  name: string;

  @Column({ name: 'slug' })
  slug: string;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @ManyToOne(() => OwnerEntity, (owner) => owner.stablishments)
  @JoinColumn({ name: 'owner_id' })
  owner: OwnerEntity;

  @OneToMany(() => ProductEntity, (product) => product.stablishment)
  products: ProductEntity[];
}
