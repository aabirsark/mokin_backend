import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/users.entity';

import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ThoughtDTO } from './dto/thought.dto';
import { Thoughts } from './entites/thought.entity';

@Injectable()
export class ThoughtsService {
  constructor(
    @InjectRepository(Thoughts) readonly thoughtsRepo: Repository<Thoughts>,
    private readonly userServices: UsersService,
  ) {}

  async createThoughts(info: ThoughtDTO): Promise<Thoughts | any> {
    const user = await this.userServices.find(info.userId);
    if (user) {
      const newThought = this.thoughtsRepo.create({
        quote: info.thought,
        user,
      });

      return this.thoughtsRepo.save(newThought);
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async findThoughts(): Promise<Thoughts[] | any> {
    return this.thoughtsRepo.find({
      select: {
        id: true,
        quote: true,
        created_At: true,
      },
      relations: {
        user: true,
      },
    });
  }

  async getThought(id: number): Promise<Thoughts> {
    return this.thoughtsRepo.findOneBy({ id });
  }
}
