import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AccountType } from 'generated/prisma';

export class CreateAccountDto {
  @IsUUID()
  userId: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsString()
  @IsOptional()
  businessName?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  timezone: string;
}
