import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ThoughtsService } from './thoughts.service';

@Controller('thoughts')
export class ThoughtsController {
  constructor(private readonly thoughtService: ThoughtsService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  async createPost(@Req() req, @Body() body): Promise<void> {
    return this.thoughtService.createThoughts({
      userId: req.user.userId,
      thought: body.thought,
    });
  }

  @Get('all')
  async getThoughts() {
    return this.thoughtService.findThoughts();
  }
}
