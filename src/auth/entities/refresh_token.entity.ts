import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  value: string;

  @Column()
  userId: number;

  @Column({ default: Date.now() })
  createdAt: number;

  @Column({})
  expiryAt: number;
}
