import { Module } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { SignInController } from './sign-in.controller';
import { FindUsersModule } from 'src/user-management/find-users/find-users.module';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [FindUsersModule, DatabaseModule],
  controllers: [SignInController],
  providers: [SignInService, JwtService, SessionsService],
})
export class SignInModule {}
