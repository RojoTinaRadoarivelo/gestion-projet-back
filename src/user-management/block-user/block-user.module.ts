import { Module } from '@nestjs/common';

import { BlockUserService } from './block-user.service';
import { BlockUserController } from './block-user.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { UserRepository } from '../interfaces/users.repository';
import { PrismaUserRepository } from '../users.prisma-repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BlockUserController],
  providers: [BlockUserService, UserRepository, PrismaUserRepository],
})
export class BlockUserModule {}
