import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  RegisterNewUser(@Body() body) {
    console.log(body);
    return this.authService.registerUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.returnTokens(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Post('addInfo')
  async addContactInfo(@Req() req, @Body() body) {
    return this.userService.createContactInfo({
      userId: req.user.userId,
      email: body.email,
      address: body.address,
      phone: body.phone,
    });
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    console.log(req.user.userId);
    return this.userService.findUserProfile(req.user.userId);
  }

  @Post('refresh')
  async refreshToken(@Body() body) {
    return this.authService.refreshToken(body.refresh);
  }

  @UseGuards(JWTAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    return this.authService.removeRefreshTokenOfId(req.user.userID);
  }
}
