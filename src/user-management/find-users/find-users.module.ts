import { Module } from '@nestjs/common';

import { FindUsersService } from './find-users.service';
import { FindUsersController } from './find-users.controller';
import { UserRepository } from '../interfaces/users.repository';
import { PrismaUserRepository } from '../users.prisma-repository';
import { FindAllUserPresenter } from '../interfaces/presenters/users.presenter';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FindUsersController],
  providers: [
    FindUsersService,
    UserRepository,
    PrismaUserRepository,
    FindAllUserPresenter,
  ],
  exports: [
    FindUsersService,
    UserRepository,
    PrismaUserRepository,
    FindAllUserPresenter,
  ],
})
export class FindUsersModule {}
