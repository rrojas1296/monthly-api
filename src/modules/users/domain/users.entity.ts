import { UserProvider } from 'generated/prisma';

interface Props {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  hasOnboarding?: boolean;
  id?: string;
  photoUrl?: string | null;
  provider?: UserProvider;
  deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export class UserEntity {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  hasOnboarding?: boolean;
  id?: string;
  photoUrl?: string | null;
  provider?: UserProvider;
  deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;

  constructor(props: Props) {
    const {
      firstName,
      id,
      lastName,
      email,
      deleted,
      photoUrl,
      provider,
      updatedAt,
      createdAt,
      hasOnboarding,
    } = props;
    this.email = email;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.photoUrl = photoUrl;
    this.provider = provider;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.hasOnboarding = hasOnboarding;
    this.deleted = deleted;
  }
}
