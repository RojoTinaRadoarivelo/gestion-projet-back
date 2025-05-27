import { Module } from '@nestjs/common';

import { FindGroupsModule } from './find-groups/find-groups.module';
import { CreateGroupsModule } from './create-groups/create-groups.module';
import { UpdateGroupsModule } from './update-groups/update-groups.module';
import { DeleteGroupsModule } from './delete-groups/delete-groups.module';

@Module({
  imports: [
    FindGroupsModule,
    CreateGroupsModule,
    UpdateGroupsModule,
    DeleteGroupsModule,
  ],
})
export class GroupManagementModule {}
