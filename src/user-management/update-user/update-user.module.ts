import { Module } from '@nestjs/common';

import { UpdateUserService } from './update-user.service';
import { UpdateUserController } from './update-user.controller';
import { UserRepository } from '../interfaces/users.repository';
import { PrismaUserRepository } from '../users.prisma-repository';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UpdateUserController],
  providers: [UpdateUserService, UserRepository, PrismaUserRepository],
  exports: [UpdateUserService, UserRepository, PrismaUserRepository],
})
export class UpdateUserModule {}
