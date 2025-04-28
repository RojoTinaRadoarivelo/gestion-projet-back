import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MfaService } from './mfa.service';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import {
  SendVerificationCodeDto,
  VerificationCodeDto,
} from '../interfaces/dtos/verification-code.dto';

@Controller('auth')
export class MfaController {
  constructor(private readonly _mfaService: MfaService) {}
  @Post('send-verification-code')
  @UsePipes(new GenericDtoValidatorPipe<SendVerificationCodeDto>())
  async SendVerification(
    @Body() data: SendVerificationCodeDto,
  ): Promise<reponsesDTO<{}>> {
    let response: reponsesDTO<{}>;

    const sendmailVerification = await this._mfaService.SendVerificationCode(
      data.email,
    );

    const statusCode = sendmailVerification.statusCode;
    const message = sendmailVerification.message;

    response = { statusCode, message };

    return response;
  }
  @Post('verify-code')
  @UsePipes(new GenericDtoValidatorPipe<VerificationCodeDto>())
  async VerifyCode(
    @Body() data: VerificationCodeDto,
  ): Promise<reponsesDTO<{}>> {
    let response: reponsesDTO<{}>;

    const sendmailVerification = await this._mfaService.verifyCode(
      data.email,
      data.code,
    );

    const statusCode = sendmailVerification.statusCode;
    const message = sendmailVerification.message;

    response = { statusCode, message };

    return response;
  }
}
