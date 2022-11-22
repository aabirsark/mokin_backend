import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { info } from 'console';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { ContactInfoEntity } from './entity/contact_info.entity';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(ContactInfoEntity)
    private readonly contactInfo: Repository<ContactInfoEntity>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  async createUser(user: UserDTO): Promise<any> {
    const newUser = this.userRepo.create({
      username: user.username,
      name: user.name,
      password: user.password,
    });

    const savedUser = await this.userRepo.save(newUser);

    let { password, ...result } = savedUser;

    return result;
  }

  // add contact info
  async createContactInfo(info: ContactInfo) {
    const user = await this.userRepo.findOneBy({ id: info.userId });

    if (user) {
      const alreadyContact = await this.contactInfo.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });

      if (alreadyContact) {
        alreadyContact.address = info.address;
        alreadyContact.bio = info.bio;
        alreadyContact.email = info.email;
        alreadyContact.phone = info.phone;
        return this.contactInfo.save(alreadyContact);
      }

      const newContact = this.contactInfo.create({
        email: info.email,
        address: info.address,
        phone: info.phone,
        bio: info.bio,
        user: user,
      });

      const savedContact = await this.contactInfo.save(newContact);
      return savedContact;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async findUser(username: string): Promise<User> {
    return this.userRepo.findOneBy({ username });
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }

  async findUserProfile(id: number): Promise<User> {
    return this.userRepo.findOne({
      order: {
        thoughts: {
          created_At: 'DESC',
        },
      },
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
      },
      where: {
        id,
      },
      relations: {
        contactInfo: true,
        thoughts: true,
      },
    });
  }

  async find(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }
}
