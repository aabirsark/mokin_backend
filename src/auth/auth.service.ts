import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from './entities/refresh_token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(RefreshTokenEntity)
    private refreshTokenRepo: Repository<RefreshTokenEntity>,
  ) {}

  // generates a hash password
  private async hashPassword(pass: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    console.log(pass);
    const hash = await bcrypt.hash(pass, salt);
    return hash;
  }

  // create user
  async registerUser(user: UserDTO) {
    user.password = await this.hashPassword(user.password);
    const savedUser = await this.userService.createUser(user);
    return this.returnTokens(savedUser);
  }

  // validate user
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findUser(username);

    const isUser = await bcrypt.compare(pass, user.password);

    console.log(user);
    console.log(isUser);

    if (user && isUser) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async generateRefreshToken(user: any): Promise<any> {
    const randString = this.generateRandomString();
    console.log(user.id);
    try {
      const isRefreshTokenPresent = await this.refreshTokenRepo.findOneBy({
        userId: user.id,
      });

      if (isRefreshTokenPresent) {
        isRefreshTokenPresent.value = randString;
        isRefreshTokenPresent.expiryAt = this.generateExpiryDate();
        await this.refreshTokenRepo.save(isRefreshTokenPresent);
        return randString;
      }

      const newRefreshToken = this.refreshTokenRepo.create({
        value: randString,
        expiryAt: this.generateExpiryDate(),
        userId: user.id,
      });

      await this.refreshTokenRepo.save(newRefreshToken);

      return randString;
    } catch (error) {
      console.log(error);
    }
  }

  // genereate JWT
  async generateJWT(user: any) {
    const payload = { username: user.username, uid: user.id };
    return this.jwtService.sign(payload);
  }

  // return the refresh and JWT token
  async returnTokens(user: any): Promise<any> {
    console.log(user);
    return {
      refresh: await this.generateRefreshToken(user),
      access_token: await this.generateJWT(user),
    };
  }

  // refresh tokens
  async refreshToken(token: string) {
    const randString = this.generateRandomString();
    const isRefreshTokenPresent = await this.refreshTokenRepo.findOneBy({
      value: token,
    });

    if (isRefreshTokenPresent && Date.now() <= isRefreshTokenPresent.expiryAt) {
      const user = await this.userService.find(isRefreshTokenPresent.userId);

      if (user) {
        isRefreshTokenPresent.value = randString;
        await this.refreshTokenRepo.save(isRefreshTokenPresent);

        return {
          access_token: await this.generateJWT(user),
          refresh: randString,
        };
      }
    }
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Crossed the expiry limit',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  // remove the refresh token
  async removeRefreshTokenOfId(userId: number) {
    const refreshTokens = await this.refreshTokenRepo.findBy({ userId });
    return await this.refreshTokenRepo.remove(refreshTokens);
  }

  // generates random string for refreshToken
  private generateRandomString() {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 40; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private generateExpiryDate() {
    const presentDate = Date.now();
    const afterSevenDay = 7 * 24 * 60 * 60 * 1000;
    const expiryDate = presentDate + afterSevenDay;
    return expiryDate;
  }
}
