import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AccountType, MeetingProvider, MeetingType } from 'generated/prisma';

class OpeningHour {
  @IsNumber()
  dayOfWeek: number;

  @IsString()
  openTime: string;

  @IsString()
  closeTime: string;

  @IsBoolean()
  isEnabled: boolean;
}

class Meeting {
  @IsString()
  name: string;

  @IsEnum(MeetingType)
  type: MeetingType;

  @IsNumber()
  durationMin: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(MeetingProvider)
  provider: MeetingProvider;
}

class User {
  @IsUUID()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

class Account {
  @IsEnum(AccountType)
  type: AccountType;

  @IsString()
  @IsOptional()
  businessName?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  timezone: string;
}

export class FinishOnboardingDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => User)
  user: User;

  @IsDefined()
  @ValidateNested()
  @Type(() => Account)
  account: Account;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpeningHour)
  openingHours: OpeningHour[];

  @IsDefined()
  @ValidateNested()
  @Type(() => Meeting)
  meeting: Meeting;
}
