import { AccountEntity } from './accounts.entity';

export interface IAccountsRepository {
  create(data: AccountEntity): Promise<string>;
  get(id: string): Promise<AccountEntity>;
  update(id: string, data: AccountEntity): Promise<string>;
  delete(id: string): Promise<string>;
}
