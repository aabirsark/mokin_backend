import { ActivityEntity } from 'src/activity/entities/activity.entity';
import { Thoughts } from 'src/thoughts/entites/thought.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfoEntity } from './contact_info.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: Date.now() })
  createdAt: number;

  @OneToOne(() => ContactInfoEntity, (contactInfo) => contactInfo.user)
  @JoinColumn()
  contactInfo: ContactInfoEntity;

  @OneToMany(() => Thoughts, (thoughts) => thoughts.user)
  thoughts: Thoughts[];

  @OneToMany(() => ActivityEntity , activity => activity.activiyByUserId  )
  recentActivites : ActivityEntity[]
}
