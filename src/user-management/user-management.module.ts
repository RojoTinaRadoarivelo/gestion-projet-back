import { Module } from '@nestjs/common';

import { CreateUserModule } from './create-user/create-user.module';
import { UpdateUserModule } from './update-user/update-user.module';
import { FindUsersModule } from './find-users/find-users.module';
import { BlockUserModule } from './block-user/block-user.module';

@Module({
  imports: [
    CreateUserModule,
    UpdateUserModule,
    FindUsersModule,
    BlockUserModule,
  ],
  exports: [CreateUserModule, UpdateUserModule, FindUsersModule],
})
export class UserManagementModule {}
