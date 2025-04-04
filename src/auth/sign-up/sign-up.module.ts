import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { SignUpController } from './sign-up.controller';
import { MfaService } from '../mfa/mfa.service';
import { SMTPUtil } from 'src/core/utils/smtp.util';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService, MfaService, SMTPUtil],
})
export class SignUpModule {}
