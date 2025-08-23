import { IsBoolean, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserProvider } from 'generated/prisma';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  photoUrl?: string;

  @IsEmail()
  @IsOptional()
  firstName?: string;

  @IsEmail()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  refreshToken?: string;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;

  @IsEnum(UserProvider)
  @IsOptional()
  provider?: UserProvider;

  @IsBoolean()
  @IsOptional()
  hasOnboarding?: boolean;
}
