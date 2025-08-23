import { MeetingProvider, MeetingType } from 'generated/prisma';

interface Props {
  id?: string;
  accountId: string;
  name: string;
  type: MeetingType;
  durationMin: number;
  address?: string | null;
  phone?: string | null;
  provider?: MeetingProvider | null;
}
export class MeetingsEntity {
  id?: string;
  accountId: string;
  name: string;
  type: MeetingType;
  durationMin: number;
  address?: string | null;
  phone?: string | null;
  provider?: MeetingProvider | null;

  constructor(props: Props) {
    const { id, accountId, name, type, durationMin, address, phone, provider } =
      props;
    this.id = id;
    this.accountId = accountId;
    this.name = name;
    this.type = type;
    this.durationMin = durationMin;
    this.address = address;
    this.phone = phone;
    this.provider = provider;
  }
}
