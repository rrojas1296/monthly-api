import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IOpeningHourRepository } from '../domain/openingHourRepository.interface';
import { OpeningHourEntity } from '../domain/openingHours.entity';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class OpeningHourRepository implements IOpeningHourRepository {
  constructor(private _prismaService: PrismaService) {}
  async create(data: OpeningHourEntity): Promise<string> {
    const oh = await this._prismaService.openingHour.create({
      data,
    });

    return oh.id;
  }

  async createSet(data: OpeningHourEntity[]): Promise<number> {
    const created = await this._prismaService.openingHour.createMany({
      data,
    });
    return created.count;
  }

  async getById(id: string): Promise<OpeningHourEntity> {
    const oh = await this._prismaService.openingHour.findFirst({
      where: { id },
    });
    if (!oh) throw new HttpException('OH not found', HttpStatus.BAD_REQUEST);
    return new OpeningHourEntity(oh);
  }

  async disable(id: string): Promise<string> {
    await this._prismaService.openingHour.update({
      where: { id },
      data: { isEnabled: true },
    });
    return id;
  }

  async update(id: string, data: OpeningHourEntity): Promise<string> {
    await this._prismaService.openingHour.update({
      where: { id },
      data,
    });
    return id;
  }
}
