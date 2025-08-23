import { Module } from '@nestjs/common';
import { UsersRepository } from './infrastructure/users.repository';
import { UsersService } from './applicatiom/users.service';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';

@Module({
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: UsersRepository,
    },
  ],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
