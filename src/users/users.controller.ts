import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return this.userService.findUserProfile(id);
  }
}
