import { ActivityEntity } from 'src/activity/entities/activity.entity';
import { User } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Thoughts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quote: string;

  @Column({ default: Date.now() })
  created_At: number;

  @ManyToOne(() => User, (user) => user.thoughts, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => ActivityEntity, (activity) => activity.post)
  activites: ActivityEntity[];
}
