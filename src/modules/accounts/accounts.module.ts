import { Module } from '@nestjs/common';
import { AccountsRepository } from './infrastructure/accounts.repository';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import { AccountsService } from './application/accounts.service';

@Module({
  providers: [AccountsService, AccountsRepository],
  exports: [AccountsService],
  imports: [PrismaModule],
})
export class AccountsModule {}
