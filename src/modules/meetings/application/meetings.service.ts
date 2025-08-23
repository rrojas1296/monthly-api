import { Inject, Injectable } from '@nestjs/common';
import { MeetingsEntity } from '../domain/meetings.entity';
import { CreateMeetingDto } from '../application/dtos/createMeeting.dto';
import { IMeetingsRepository } from '../domain/meetingsRepository.interface';

@Injectable()
export class MeetingsService {
  constructor(
    @Inject(IMeetingsRepository)
    private readonly _meetingRepository: IMeetingsRepository,
  ) {}
  async createMeeting(dto: CreateMeetingDto) {
    const data = new MeetingsEntity(dto);
    return await this._meetingRepository.create(data);
  }
}
