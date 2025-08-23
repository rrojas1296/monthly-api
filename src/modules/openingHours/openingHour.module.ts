import { Module } from '@nestjs/common';
import { OpeningHourRepository } from './infrastructure/openingHour.repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Module({
  providers: [OpeningHourRepository, PrismaService],
  exports: [OpeningHourRepository],
})
export class OpeningHourModule {}
