import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { SignUpController } from './sign-up.controller';
import { MfaService } from '../mfa/mfa.service';
import { SMTPUtil } from 'src/core/utils/smtp.util';
import { DatabaseModule } from 'src/core/database/database.module';
import { CreateUserModule } from 'src/user-management/create-user/create-user.module';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';

@Module({
  imports: [DatabaseModule, CreateUserModule],
  controllers: [SignUpController],
  providers: [SignUpService, MfaService, SMTPUtil, JwtService, SessionsService],
})
export class SignUpModule {}
