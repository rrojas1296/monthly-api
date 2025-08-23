import { AccountType } from 'generated/prisma';

interface Props {
  id?: string;
  userId: string;
  type: AccountType;
  businessName?: string | null;
  industry?: string | null;
  timezone: string;
  createdAt?: string;
  updatedAt?: string;
}
export class AccountEntity {
  userId: string;
  id?: string;
  type: AccountType;
  businessName?: string | null;
  industry?: string | null;
  timezone: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(props: Props) {
    const {
      userId,
      type = 'PERSONAL',
      businessName,
      industry,
      timezone,
      createdAt,
      updatedAt,
      id,
    } = props;
    this.userId = userId;
    this.type = type;
    this.businessName = businessName;
    this.industry = industry;
    this.timezone = timezone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }
}
