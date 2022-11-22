import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ unique: true })
  value: string;

  @Column()
  userId: number;

  @Column({ default: Date.now(), type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  expiryAt: number;
}
