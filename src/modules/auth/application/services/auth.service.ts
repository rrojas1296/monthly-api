import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { LoginUserDto } from '../../application/dto/loginUser.dto';
import { BcryptService } from 'src/infrastructure/shared/bcrypt.service';
import { JwtService } from 'src/infrastructure/shared/jwt.service';
import { RegisterUserDto } from '../../application/dto/registerUser.dto';
import { Payload } from '../../domain/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private _prismaService: PrismaService,
    private _bcryptService: BcryptService,
    private _jwtService: JwtService,
  ) {}
  async loginUser(data: LoginUserDto) {
    const { email, password } = data;
    const user = await this._prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const matchPassword = await this._bcryptService.compare(
      password,
      user.password as string,
    );
    if (!matchPassword) throw new UnauthorizedException('Password not match');

    const { refreshToken, accessToken } = await this._jwtService.generateTokens(
      {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        sub: user.id,
        email: user.email,
      },
    );
    return { accessToken, refreshToken, message: 'User logged successfully' };
  }

  async registerUser(data: RegisterUserDto) {
    const { email, password } = data;
    const hashed = await this._bcryptService.hash(password);
    const userDB = await this._prismaService.user.findFirst({
      where: { email },
    });
    if (userDB)
      throw new HttpException(
        'Email is already in user',
        HttpStatus.BAD_REQUEST,
      );
    const newUser = await this._prismaService.user.create({
      data: {
        email,
        password: hashed,
      },
    });
    const { accessToken, refreshToken } = await this._jwtService.generateTokens(
      {
        firstName: newUser.firstName || '',
        lastName: newUser.lastName || '',
        sub: newUser.id,
        email,
      },
    );
    return {
      accessToken,
      refreshToken,
      message: 'User registered successfully',
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this._jwtService.verify(
        refreshToken,
        'refreshToken',
      );
      const tokens = await this._jwtService.generateTokens(payload);
      return tokens;
    } catch {
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);
    }
  }

  loginGoogle(payload: Payload) {
    return this._jwtService.generateTokens(payload);
  }
}
