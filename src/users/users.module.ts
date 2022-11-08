import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfoEntity } from './entity/contact_info.entity';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, ContactInfoEntity, ]),
  ],
})
export class UsersModule {}
