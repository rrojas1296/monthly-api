import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../applicatiom/dtos/createUser.dto';
import { UpdateUserDto } from '../applicatiom/dtos/updateUser.dto';
import { UsersRepository } from '../infrastructure/users.repository';
import { UserEntity } from '../domain/users.entity';

@Injectable()
export class UsersService {
  constructor(private _userRepository: UsersRepository) {}

  createUser(dto: CreateUserDto) {
    return this._userRepository.create(dto);
  }

  async getUserByEmail(email: string) {
    const user = await this._userRepository.getByEmail(email);
    return user;
  }

  async getUserById(id: string) {
    const user = await this._userRepository.getById(id);
    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const existing = await this._userRepository.getById(id);
    const userData = new UserEntity({
      ...existing,
      ...data,
    });
    return await this._userRepository.update(id, userData);
  }

  async deleteUser(id: string) {
    return await this._userRepository.delete(id);
  }
}
