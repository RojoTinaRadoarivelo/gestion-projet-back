import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { UpdateUserModule } from 'src/user-management/update-user/update-user.module';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { MfaModule } from '../mfa/mfa.module';

@Module({
  imports: [DatabaseModule, UpdateUserModule, MfaModule],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, JwtService, SessionsService],
})
export class ForgotPasswordModule {}
