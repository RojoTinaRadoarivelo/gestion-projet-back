import { Module } from '@nestjs/common';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@Module({
  imports: [SignInModule, SignUpModule, ForgotPasswordModule],
  exports: [SignInModule, SignUpModule, ForgotPasswordModule],
})
export class AuthModule {}
