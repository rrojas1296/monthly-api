import { Injectable } from '@nestjs/common';
import { FinishOnboardingDto } from '../application/dto/finishOnboarding.dto';
import { OpeningHourRepository } from 'src/modules/openingHours/infrastructure/openingHour.repository';
import { OpeningHourEntity } from 'src/modules/openingHours/domain/openingHours.entity';
import { UsersService } from '@/modules/users/applicatiom/users.service';
import { MeetingsService } from '@/modules/meetings/application/meetings.service';
import { AccountsService } from '@/modules/accounts/application/accounts.service';

@Injectable()
export class OnboardingService {
  constructor(
    private _usersService: UsersService,
    private _meetingsService: MeetingsService,
    private _accountsService: AccountsService,
    private _openingHourRepo: OpeningHourRepository,
  ) {}

  async finishOnboarding(data: FinishOnboardingDto) {
    const { account, user, openingHours, meeting } = data;
    const { id, ...otherUserInfo } = user;

    await this._usersService.updateUser(id, {
      ...otherUserInfo,
      hasOnboarding: true,
    });

    const accountId = await this._accountsService.createAccount({
      ...account,
      userId: id,
    });
    const ohData = openingHours.map(
      (oh) => new OpeningHourEntity({ ...oh, accountId }),
    );

    await this._openingHourRepo.createSet(ohData);

    await this._meetingsService.createMeeting({
      ...meeting,
      accountId,
    });
    return { message: 'Onboarding finished' };
  }

  async validate(userId: string) {
    const user = await this._usersService.getUserById(userId);
    return user.hasOnboarding!;
  }
}
