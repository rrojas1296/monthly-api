interface Props {
  id?: string;
  accountId: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isEnabled?: boolean;
}
export class OpeningHourEntity {
  id?: string;
  accountId: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isEnabled?: boolean;

  constructor(props: Props) {
    const { id, accountId, dayOfWeek, openTime, closeTime, isEnabled } = props;
    this.id = id;
    this.accountId = accountId;
    this.dayOfWeek = dayOfWeek;
    this.openTime = openTime;
    this.closeTime = closeTime;
    this.isEnabled = isEnabled;
  }
}
