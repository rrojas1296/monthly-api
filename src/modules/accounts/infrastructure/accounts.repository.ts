import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAccountsRepository } from '../domain/accountsRepository.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { AccountEntity } from '@/modules/accounts/domain/accounts.entity';

@Injectable()
export class AccountsRepository implements IAccountsRepository {
  constructor(private _primsaService: PrismaService) {}
  async get(id: string): Promise<AccountEntity> {
    const account = await this._primsaService.account.findFirst({
      where: {
        id,
      },
    });
    if (!account)
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);
    const { userId, type, businessName, industry, timezone } = account;
    return new AccountEntity({
      userId,
      type,
      businessName,
      industry,
      timezone,
    });
  }

  async update(id: string, data: AccountEntity): Promise<string> {
    const account = await this._primsaService.account.update({
      where: {
        id,
      },
      data,
    });

    return account.id;
  }

  async create(data: AccountEntity): Promise<string> {
    const newAccount = await this._primsaService.account.create({
      data,
    });
    return newAccount.id;
  }

  async delete(id: string): Promise<string> {
    await this._primsaService.account.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
    return id;
  }
}
