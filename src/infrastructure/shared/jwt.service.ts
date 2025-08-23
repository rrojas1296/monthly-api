import { Payload } from '@/modules/auth/domain/interfaces/payload.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jose from 'jose';

@Injectable()
export class JwtService {
  private secretAccessToken: Uint8Array;
  private secretRefreshToken: Uint8Array;
  constructor(private readonly _confService: ConfigService) {
    const accessSecret = this._confService.get<string>(
      'JWT_SECRET',
      'my-secret',
    );
    const refreshSecret = this._confService.get<string>(
      'REFRESH_SECRET',
      'refresh-secret',
    );

    this.secretAccessToken = new TextEncoder().encode(accessSecret);
    this.secretRefreshToken = new TextEncoder().encode(refreshSecret);
  }

  async generateTokens(payload: Payload) {
    const accessToken = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(this.secretAccessToken);
    const refreshToken = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24w')
      .sign(this.secretRefreshToken);

    return { accessToken, refreshToken };
  }

  async verify(token: string, tokenType: 'accessToken' | 'refreshToken') {
    try {
      const secret =
        tokenType === 'accessToken'
          ? this.secretAccessToken
          : this.secretRefreshToken;
      const { payload } = await jose.jwtVerify<Payload>(token, secret);
      return {
        sub: payload.sub,
        lastName: payload.lastName,
        firstName: payload.firstName,
        email: payload.email,
      };
    } catch {
      throw new HttpException('Token is not valid', HttpStatus.BAD_REQUEST);
    }
  }
}
