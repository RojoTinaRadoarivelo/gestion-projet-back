import { Module } from '@nestjs/common';
import { CreateGroupsService } from './create-groups.service';
import { CreateGroupsController } from './create-groups.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { PrismaGroupRepository } from '../group.prisma-repository';
import { GroupRepository } from '../interfaces/groups.repository';
import { CreateGroupPresenter } from '../interfaces/presenters/groups.presenters';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateGroupsController],
  providers: [
    CreateGroupsService,
    GroupRepository,
    PrismaGroupRepository,
    CreateGroupPresenter,
  ],
  exports: [
    CreateGroupsService,
    GroupRepository,
    PrismaGroupRepository,
    CreateGroupPresenter,
  ],
})
export class CreateGroupsModule {}
