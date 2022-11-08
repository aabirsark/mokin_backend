import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thoughts } from './entites/thought.entity';
import { ThoughtsService } from './thoughts.service';
import { ThoughtsController } from './thoughts.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ThoughtsService],
  exports: [ThoughtsService],
  imports: [TypeOrmModule.forFeature([Thoughts]), UsersModule],
  controllers: [ThoughtsController],
})
export class ThoughtsModule {}
