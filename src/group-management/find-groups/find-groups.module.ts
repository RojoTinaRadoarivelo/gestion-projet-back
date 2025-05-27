import { Module } from '@nestjs/common';
import { FindGroupsService } from './find-groups.service';
import { FindGroupsController } from './find-groups.controller';
import {
  FindAllGroupPresenter,
  FindOneGroupPresenter,
} from '../interfaces/presenters/groups.presenters';
import { DatabaseModule } from 'src/core/database/database.module';
import { PrismaGroupRepository } from '../group.prisma-repository';
import { GroupRepository } from '../interfaces/groups.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [FindGroupsController],
  providers: [
    FindGroupsService,
    GroupRepository,
    PrismaGroupRepository,
    FindOneGroupPresenter,
    FindAllGroupPresenter,
  ],
  exports: [
    FindGroupsService,
    GroupRepository,
    PrismaGroupRepository,
    FindOneGroupPresenter,
    FindAllGroupPresenter,
  ],
})
export class FindGroupsModule {}
