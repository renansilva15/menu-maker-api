import { randomUUID } from 'crypto';
import { BeforeInsert, BeforeUpdate, Column, PrimaryColumn } from 'typeorm';

export abstract class DefaultEntity<T> {
  constructor(data: Partial<T> = {}) {
    Object.assign(this, data);
    this.id = this.id ?? randomUUID();
  }

  @BeforeInsert()
  beforeInsert(): void {
    this.createdAt = this.createdAt ?? new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate(): void {
    this.updatedAt = new Date();
  }

  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
