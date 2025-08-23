import { Module } from '@nestjs/common';
import { MeetingsRepository } from './infrastructure/meetings.repository';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import { IMeetingsRepository } from './domain/meetingsRepository.interface';
import { MeetingsService } from './application/meetings.service';

@Module({
  providers: [
    MeetingsService,
    {
      provide: IMeetingsRepository,
      useClass: MeetingsRepository,
    },
  ],
  exports: [MeetingsService],
  imports: [PrismaModule],
})
export class MeetingsModule {}
