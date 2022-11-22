import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThoughtsService } from 'src/thoughts/thoughts.service';
import { UsersService } from 'src/users/users.service';
import { Like, Repository } from 'typeorm';
import { ActivityDTO } from './dto/activity.dto';
import { ActivityEntity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepo: Repository<ActivityEntity>,
    private readonly thoughtService: ThoughtsService,
    private readonly userService: UsersService,
  ) {}

  async NewActivity(activityDTO: ActivityDTO) {
    const quote = await this.thoughtService.getThought(activityDTO.postId);
    const activityUser = await this.userService.findUserById(
      activityDTO.userId,
    );

    const newActivity = this.activityRepo.create({
      post: quote,
      value: activityDTO.value,
      rootUserId: activityDTO.rootUserId,
      activiyByUserId: activityUser,
      type: activityDTO.type,
    });
    return this.activityRepo.save(newActivity);
  }

  async getUserActivity(id: number) {
    const activites = await this.activityRepo.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        rootUserId: id,
      },
      relations: {
        activiyByUserId: true,
        post: true,
      },
    });

    const returnBody = [];

    activites.forEach((element) => {
      returnBody.push({
        id: element.id,
        type: element.type,
        created_At: element.createdAt,
        user: {
          id: element.activiyByUserId.id,
          username: element.activiyByUserId.username,
        },
        post: element.post,
      });
    });

    return returnBody;
  }

  async getComments(postId: number) {
    const post = await this.thoughtService.getThought(postId);
    const comments = this.activityRepo.find({
      where: {
        type: 'comment',
        post: {
          id: post.id,
        },
      },
      relations: ['activiyByUserId'],
    });
    return comments;
  }
}
