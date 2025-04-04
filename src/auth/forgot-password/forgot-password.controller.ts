import { Controller, Post } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('auth')
export class ForgotPasswordController {
  constructor(private readonly _forgotPasswordService: ForgotPasswordService) {}

  @Post('forgot-password')
  async ForgotPassword() {}
}
