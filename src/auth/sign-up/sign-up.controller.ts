import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';
import { cookieOptions } from 'src/core/utils/cookies.util';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { SignUpDto } from '../interfaces/dtos/sign-up.dto';
import { Response } from 'express';

@Controller('auth')
export class SignUpController {
  constructor(private readonly _signUpService: SignUpService) {}

  @Post('sign-up')
  @UsePipes(new GenericDtoValidatorPipe<SignUpDto>())
  async SignUp(
    @Body() data: SignUpDto,
    @Res() res: Response,
  ): Promise<reponsesDTO<{ sess_id: any }> | any> {
    let response: reponsesDTO<{ sess_id: any }>;

    const signUp = await this._signUpService.SignUp(data);
    const statusCode = signUp.statusCode;
    const message = signUp.message;

    if (signUp.data) {
      res.cookie('accessToken', signUp.data.c_id, cookieOptions);
      response = {
        message,
        data: { sess_id: signUp.data.sess_id },
        statusCode,
      };
    } else {
      response = { statusCode, message };
    }
    return res.status(statusCode).json(response);
  }
}
