import { Module } from '@nestjs/common';
import { DeleteGroupsService } from './delete-groups.service';
import { DeleteGroupsController } from './delete-groups.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { GroupRepository } from '../interfaces/groups.repository';
import { PrismaGroupRepository } from '../group.prisma-repository';
import { FindOneGroupPresenter } from '../interfaces/presenters/groups.presenters';

@Module({
  imports: [DatabaseModule],
  controllers: [DeleteGroupsController],
  providers: [
    DeleteGroupsService,
    GroupRepository,
    PrismaGroupRepository,
    FindOneGroupPresenter,
  ],
  exports: [
    DeleteGroupsService,
    GroupRepository,
    PrismaGroupRepository,
    FindOneGroupPresenter,
  ],
})
export class DeleteGroupsModule {}
