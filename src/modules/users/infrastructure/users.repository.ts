import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/users.repository.interface';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { UserEntity } from '../domain/users.entity';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private _prismaService: PrismaService) {}

  async create(data: UserEntity): Promise<string> {
    const newUser = await this._prismaService.user.create({
      data,
    });
    return newUser.id;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this._prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new HttpException('User not foun', HttpStatus.BAD_REQUEST);
    return new UserEntity(user);
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this._prismaService.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) throw new HttpException('User not foun', HttpStatus.BAD_REQUEST);
    return new UserEntity(user);
  }

  async update(id: string, data: UserEntity): Promise<string> {
    const user = await this._prismaService.user.update({
      where: {
        id,
      },
      data,
    });
    return user.id;
  }

  async delete(id: string): Promise<string> {
    const user = await this._prismaService.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });

    return user.id;
  }
}
