import { MeetingProvider, MeetingType } from 'generated/prisma';

export class CreateMeetingDto {
  accountId: string;
  name: string;
  type: MeetingType;
  durationMin: number;
  address?: string;
  phone?: string;
  provider: MeetingProvider;
}
