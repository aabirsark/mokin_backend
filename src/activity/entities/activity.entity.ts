import { Thoughts } from 'src/thoughts/entites/thought.entity';
import { User } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  rootUserId: number;

  @ManyToOne(() => User, (user) => user.recentActivites, {
    onDelete: 'CASCADE',
  })
  activiyByUserId: User;

  @Column({ nullable: true })
  value: string;

  @Column({ default: Date.now() })
  createdAt: number;

  @ManyToOne(() => Thoughts, (thoughts) => thoughts.activites)
  post: Thoughts;
}
