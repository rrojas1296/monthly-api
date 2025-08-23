import { UserEntity } from './users.entity';

export interface IUserRepository {
  create(data: UserEntity): Promise<string>;
  getByEmail(email: string): Promise<UserEntity>;
  getById(id: string): Promise<UserEntity>;
  delete(id: string): Promise<string>;
  update(id: string, data: UserEntity): Promise<string>;
}
