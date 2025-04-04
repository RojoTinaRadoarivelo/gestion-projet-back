import { Controller, Post } from '@nestjs/common';
import { SignUpService } from './sign-up.service';

@Controller('auth')
export class SignUpController {
  constructor(private readonly _signUpService: SignUpService) {}

  @Post('sign-up')
  async SignUp() {
    return await this._signUpService.SendVerificationCode();
  }
}
