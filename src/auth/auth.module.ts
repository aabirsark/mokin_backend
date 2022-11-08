import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenEntity } from './entities/refresh_token.entity';
import { JwtStrategy } from './strategies/strategy.jwt';
import { LocalStrategy } from './strategies/strategy.local';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    JwtModule.register({
      secret: 'thisisagametobeplayed',
      signOptions: { expiresIn: '12h' },
    }),
  ],
})
export class AuthModule {}
