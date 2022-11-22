import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThoughtsModule } from 'src/thoughts/thoughts.module';
import { ActivityService } from './activity.service';
import {ActivityEntity} from './entities/activity.entity';
import { ActivityController } from './activity.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityEntity]),
    ThoughtsModule,
    UsersModule,
  ],
  providers: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}
