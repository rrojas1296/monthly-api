import { Module } from '@nestjs/common';
import { OnboardingController } from './infrastructure/onboarding.controller';
import { UsersModule } from '../users/users.module';
import { AccountsModule } from '../accounts/accounts.module';
import { MeetingsModule } from '../meetings/meetings.module';
import { OpeningHourModule } from '../openingHours/openingHour.module';
import { JwtService } from 'src/infrastructure/shared/jwt.service';
import { OnboardingService } from './application/onboarding.service';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService, JwtService],
  imports: [UsersModule, AccountsModule, MeetingsModule, OpeningHourModule],
})
export class OnboardingModule {}
