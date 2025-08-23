import { MeetingsEntity } from './meetings.entity';

export const IMeetingsRepository = Symbol('IMeetingsRepository');

export interface IMeetingsRepository {
  create(data: MeetingsEntity): Promise<string>;
  get(id: string): Promise<MeetingsEntity>;
  update(id: string, data: MeetingsEntity): Promise<string>;
  delete(id: string): Promise<string>;
}
