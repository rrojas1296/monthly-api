import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../application/dtos/CreateAccount.dto';
import { AccountEntity } from '../domain/accounts.entity';
import { AccountsRepository } from '../infrastructure/accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private _accountsRepository: AccountsRepository) {}
  createAccount(dto: CreateAccountDto) {
    const { userId, type, businessName, industry, timezone } = dto;
    const newAccount = new AccountEntity({
      userId,
      type,
      businessName,
      industry,
      timezone,
    });
    return this._accountsRepository.create(newAccount);
  }
}
