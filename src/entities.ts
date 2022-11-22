import {ActivityEntity} from './activity/entities/activity.entity';
import {RefreshTokenEntity} from './auth/entities/refresh_token.entity';
import {Thoughts} from './thoughts/entites/thought.entity';
import { ContactInfoEntity } from './users/entity/contact_info.entity';
import { User } from './users/entity/users.entity';

const entities = [
  User,
  ContactInfoEntity,
  Thoughts,
  ActivityEntity,
  RefreshTokenEntity,
];

export default entities;
