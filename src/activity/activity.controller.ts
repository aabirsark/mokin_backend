import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ActivityService } from './activity.service';
import { ActivityDTO } from './dto/activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @UseGuards(JWTAuthGuard)
  @Post('like')
  async like(@Req() req, @Body() body: ActivityDTO) {
    body.userId = req.user.userId;
    body.type = 'like';
    return this.activityService.NewActivity(body);
  }

  @UseGuards(JWTAuthGuard)
  @Post('comment')
  async comment(@Req() req, @Body() body: ActivityDTO) {
    body.userId = req.user.userId;
    body.type = 'comment';

    if (body.value) {
      return this.activityService.NewActivity(body);
    }

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Value field is necessary',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  @UseGuards(JWTAuthGuard)
  @Get('getUserActivites')
  async getUserActivity(@Req() req) {
    return this.activityService.getUserActivity(req.user.userId);
  }

  @Get('/comments/:id')
  async getCommentsOfPost(@Param('id') id: number) {
    return this.activityService.getComments(id);
  }
}
