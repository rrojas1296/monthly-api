import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto } from '../../application/dto/loginUser.dto';
import { RegisterUserDto } from '../../application/dto/registerUser.dto';
import { RefreshTokenDto } from '../../application/dto/refreshToken.dto';
import { AuthGuard } from '@nestjs/passport';
import { type Response } from 'express';
import { JwtGuard } from 'src/infrastructure/shared/guards/jwt.guard';
import { CLIENT_URL } from 'src/config/global.config';
import { type RequestWithUser } from '../../domain/interfaces/requestWithUser.interface';
import { AuthService } from '../../application/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Post('/login')
  async loginUser(@Body() data: LoginUserDto) {
    return await this._authService.loginUser(data);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return;
  }

  @Get('/logout')
  logoutUser(@Res() res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const url = CLIENT_URL + '/dashboard';
    const { accessToken, refreshToken } = await this._authService.loginGoogle(
      req.user,
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return res.redirect(url);
  }

  @Post('/register')
  async registerUser(@Body() data: RegisterUserDto, @Res() res: Response) {
    const { accessToken, refreshToken, message } =
      await this._authService.registerUser(data);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    return res.send(message).status(HttpStatus.OK);
  }

  @Post('/refresh')
  async refreshToken(@Res() res: Response, @Body() data: RefreshTokenDto) {
    console.log('===========> REFRESHING TOKEN');
    const { accessToken } = await this._authService.refreshToken(
      data.refreshToken,
    );
    return res.json({ accessToken });
  }

  @Get('/protected')
  @UseGuards(JwtGuard)
  protected() {
    return { message: 'Success' };
  }
}
