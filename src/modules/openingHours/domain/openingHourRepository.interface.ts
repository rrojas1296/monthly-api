import { OpeningHourEntity } from './openingHours.entity';

export interface IOpeningHourRepository {
  create(data: OpeningHourEntity): Promise<string>;
  createSet(data: OpeningHourEntity[]): Promise<number>;
  getById(id: string): Promise<OpeningHourEntity>;
  disable(id: string): Promise<string>;
  update(id: string, data: OpeningHourEntity): Promise<string>;
}
