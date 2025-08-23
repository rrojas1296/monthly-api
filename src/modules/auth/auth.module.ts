import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { BcryptService } from 'src/infrastructure/shared/bcrypt.service';
import { JwtService } from 'src/infrastructure/shared/jwt.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './infrastructure/strategies/google.strategy';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import { AuthService } from './application/services/auth.service';

@Module({
  controllers: [AuthController],
  imports: [PassportModule.register({ session: false }), PrismaModule],
  providers: [AuthService, BcryptService, JwtService, GoogleStrategy],
})
export class AuthModule {}
