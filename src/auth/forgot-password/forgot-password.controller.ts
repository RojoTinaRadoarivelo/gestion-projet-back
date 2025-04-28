import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordDto } from '../interfaces/dtos/forgot-pwd.dto';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';
import { Response } from 'express';
import { cookieOptions } from 'src/core/utils/cookies.util';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';

@Controller('auth')
export class ForgotPasswordController {
  constructor(private readonly _forgotPasswordService: ForgotPasswordService) {}

  @Post('forgot-password')
  @UsePipes(new GenericDtoValidatorPipe<ForgotPasswordDto>())
  async ForgotPassword(
    @Body() data: ForgotPasswordDto,
    @Res() res: Response,
  ): Promise<reponsesDTO<{ sess_id: any }> | any> {
    let response: reponsesDTO<{ sess_id: any }>;

    const { email, code } = data;

    const sendmailVerification = await this._forgotPasswordService.verifyCode(
      email,
      code,
    );

    let mailstatusCode = sendmailVerification.statusCode;
    const mailverificationMessage = sendmailVerification.message;

    if (mailstatusCode !== HttpStatus.OK) {
      mailstatusCode = HttpStatus.BAD_REQUEST;
      response = {
        message: mailverificationMessage,
        statusCode: mailstatusCode,
      };
      return res.status(mailstatusCode).json(response);
    }

    delete data.code;

    const forgotPwd = await this._forgotPasswordService.ForgotPwd(data);
    const statusCode = forgotPwd.statusCode;
    const message = forgotPwd.message;

    if (forgotPwd.data) {
      res.cookie('accessToken', forgotPwd.data.c_id, cookieOptions);
      response = {
        message,
        data: { sess_id: forgotPwd.data.sess_id },
        statusCode,
      };
    } else {
      response = { statusCode, message };
    }
    return res.status(statusCode).json(response);
  }
}
