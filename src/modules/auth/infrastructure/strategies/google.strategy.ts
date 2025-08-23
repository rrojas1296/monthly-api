import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserProvider } from 'generated/prisma';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import {
  GOOGLE_CALLBACK_URL,
  GOOGLE_ID_PROJECT,
  GOOGLE_SECRET,
} from 'src/config/google.config';
import { Payload } from '../../domain/interfaces/payload.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private _prismaService: PrismaService) {
    super({
      clientID: GOOGLE_ID_PROJECT,
      clientSecret: GOOGLE_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,

      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/calendar.events',
      ],
    });
  }

  authorizationParams(): Record<string, string> {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  async validate(
    googleAccessToken: string,
    googleRefreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;
    const email = emails ? emails[0].value : '';
    const photoUrl = photos ? photos[0].value : '';
    let userDB = await this._prismaService.user.findFirst({
      where: {
        email,
        provider: UserProvider.GOOGLE,
      },
    });
    if (!userDB) {
      userDB = await this._prismaService.user.create({
        data: {
          email,
          provider: UserProvider.GOOGLE,
          photoUrl,
          firstName: name?.givenName,
          lastName: name?.familyName,
          googleRefreshToken,
          googleAccessToken,
        },
      });
    } else {
      await this._prismaService.user.update({
        where: { email: userDB.email },
        data: { googleRefreshToken },
      });
    }
    const payload: Payload = {
      provider: UserProvider.GOOGLE,
      email,
      firstName: name?.givenName || '',
      lastName: name?.familyName || '',
      photoUrl: photos ? photos[0].value : '',
      sub: userDB.id,
    };

    done(null, payload);
  }
}
