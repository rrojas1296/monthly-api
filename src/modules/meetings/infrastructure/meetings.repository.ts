import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MeetingsEntity } from '../domain/meetings.entity';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { IMeetingsRepository } from '../domain/meetingsRepository.interface';

@Injectable()
export class MeetingsRepository implements IMeetingsRepository {
  constructor(private _prismaService: PrismaService) {}
  async create(data: MeetingsEntity): Promise<string> {
    const newMeeting = await this._prismaService.meeting.create({
      data,
    });
    return newMeeting.id;
  }

  async update(id: string, data: MeetingsEntity): Promise<string> {
    await this._prismaService.meeting.update({
      where: { id },
      data,
    });
    return id;
  }

  async get(id: string): Promise<MeetingsEntity> {
    const meeting = await this._prismaService.meeting.findFirst({
      where: { id },
    });
    if (!meeting)
      throw new HttpException('Meeting not found', HttpStatus.BAD_REQUEST);
    return new MeetingsEntity(meeting);
  }

  async delete(id: string): Promise<string> {
    await this._prismaService.meeting.update({
      where: { id },
      data: { deleted: true },
    });
    return id;
  }
}
