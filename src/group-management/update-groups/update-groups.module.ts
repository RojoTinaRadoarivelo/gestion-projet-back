import { Module } from '@nestjs/common';

import { UpdateGroupsService } from './update-groups.service';
import { UpdateGroupsController } from './update-groups.controller';
import { UpdateGroupPresenter } from '../interfaces/presenters/groups.presenters';
import { DatabaseModule } from 'src/core/database/database.module';
import { PrismaGroupRepository } from '../group.prisma-repository';
import { GroupRepository } from '../interfaces/groups.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UpdateGroupsController],
  providers: [
    UpdateGroupsService,
    GroupRepository,
    PrismaGroupRepository,
    UpdateGroupPresenter,
  ],
  exports: [
    UpdateGroupsService,
    GroupRepository,
    PrismaGroupRepository,
    UpdateGroupPresenter,
  ],
})
export class UpdateGroupsModule {}
