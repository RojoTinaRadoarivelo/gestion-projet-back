import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';
import { SignInDto } from '../interfaces/dtos/sign-in.dto';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Response } from 'express';
import { cookieOptions } from 'src/core/utils/cookies.util';

@Controller('auth')
export class SignInController {
  constructor(private readonly _signInService: SignInService) {}

  @Post('sign-in')
  @UsePipes(new GenericDtoValidatorPipe<SignInDto>())
  async SignIn(
    @Body() data: SignInDto,
    @Res() res: Response,
  ): Promise<reponsesDTO<{ sess_id: any }> | any> {
    let response: reponsesDTO<{ sess_id: any }>;

    const signIn = await this._signInService.SignIn(data);
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
