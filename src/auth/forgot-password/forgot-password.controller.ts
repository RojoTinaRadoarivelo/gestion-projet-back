import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
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

    const signIn = await this._forgotPasswordService.ForgotPwd(data);
    const statusCode = signIn.statusCode;
    const message = signIn.message;

    if (signIn.data) {
      res.cookie('accessToken', signIn.data.c_id, cookieOptions);
      response = {
        message,
        data: { sess_id: signIn.data.sess_id },
        statusCode,
      };
    } else {
      response = { statusCode, message };
    }
    return res.status(statusCode).json(response);
  }
}
