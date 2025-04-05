import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { UpdateUserModule } from 'src/user-management/update-user/update-user.module';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';

@Module({
  imports: [DatabaseModule, UpdateUserModule],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, JwtService, SessionsService],
})
export class ForgotPasswordModule {}
