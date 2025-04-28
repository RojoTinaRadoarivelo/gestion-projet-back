import { Module } from '@nestjs/common';
import { SMTPUtil } from 'src/core/utils/smtp.util';
import { MfaController } from './mfa.controller';
import { MfaService } from './mfa.service';

@Module({
  controllers: [MfaController],
  providers: [MfaService, SMTPUtil],
  exports: [MfaService, SMTPUtil],
})
export class MfaModule {}
