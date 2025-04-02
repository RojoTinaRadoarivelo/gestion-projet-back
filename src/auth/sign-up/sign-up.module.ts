import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { SignUpController } from './sign-up.controller';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
})
export class SignUpModule {}
