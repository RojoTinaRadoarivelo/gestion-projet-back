import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserController } from './create-user.controller';
import { CreateUserPresenter } from '../interfaces/presenters/users.presenter';
import { PrismaUserRepository } from '../users.prisma-repository';
import { DatabaseModule } from 'src/core/database/database.module';
import { UserRepository } from '../interfaces/users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [
    CreateUserService,
    UserRepository,
    PrismaUserRepository,
    CreateUserPresenter,
  ],
})
export class CreateUserModule {}
