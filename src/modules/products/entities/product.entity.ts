import { DefaultEntity } from 'src/common/entities/default.entity';
import { StablishmentEntity } from 'src/modules/stablishments/entities/stablishment.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export interface Category {
  name: string;
  path: string;
}

@Entity({ name: 'products' })
export class ProductEntity extends DefaultEntity<ProductEntity> {
  @Column({ name: 'nm' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'weight_volume' })
  weightOrVolume: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'category', type: 'json' })
  category: Category;

  @Column({ name: 'stablishment_id' })
  stablishmentId: string;

  @ManyToOne(() => StablishmentEntity, (stablishment) => stablishment.products)
  @JoinColumn({ name: 'stablishment_id' })
  stablishment: StablishmentEntity;
}
