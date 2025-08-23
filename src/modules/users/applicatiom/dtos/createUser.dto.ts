import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { UserProvider } from 'generated/prisma';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsUrl()
  photoUrl: string;

  @IsEnum(UserProvider)
  provider: UserProvider;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
