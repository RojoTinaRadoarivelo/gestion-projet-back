import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { SignUpController } from './sign-up.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { CreateUserModule } from 'src/user-management/create-user/create-user.module';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { MfaModule } from '../mfa/mfa.module';

@Module({
  imports: [DatabaseModule, CreateUserModule, MfaModule],
  controllers: [SignUpController],
  providers: [SignUpService, JwtService, SessionsService],
})
export class SignUpModule {}
