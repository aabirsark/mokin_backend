import {ActivityEntity} from 'src/activity/entities/activity.entity';
import { User } from 'src/users/entity/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Thoughts extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  quote: string;

  @Column({ default: Date.now() , type : "bigint" })
  created_At: number;

  @ManyToOne(() => User, (user) => user.thoughts, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => ActivityEntity, (activity) => activity.post)
  activites: ActivityEntity[];
}
