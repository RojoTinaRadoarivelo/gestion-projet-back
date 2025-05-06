import { HttpStatus, Injectable } from '@nestjs/common';
import { MfaService } from '../mfa/mfa.service';
import { SignUpDto } from '../interfaces/dtos/sign-up.dto';
import { CreateUserService } from 'src/user-management/create-user/create-user.service';
import { JwtService } from '@nestjs/jwt';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { AuthUserPresenter } from '../interfaces/presenters/auth-user.presenter';
import { SessionsService } from '../sessions/sessions.service';
import { Users } from 'src/user-management/users.entity';

@Injectable()
export class SignUpService {
  constructor(
    private readonly _mfaService: MfaService,
    private readonly _userService: CreateUserService,
    private readonly _jwtService: JwtService,
    private readonly _sessionService: SessionsService,
  ) {}

  async SignUp(
    data: SignUpDto,
  ): Promise<reponsesDTO<{ c_id: any; sess_id: any }>> {
    let response: reponsesDTO<{ c_id: any; sess_id: any }>;
    const newUser: reponsesDTO<Users> =
      await this._userService.CreateUser(data);
    const statusCode = newUser.statusCode;
    const message = newUser.message;

    if (newUser.data) {
      let userPresenter: AuthUserPresenter = new AuthUserPresenter();
      const dataResponse = userPresenter.present(newUser.data);

      const payload = {
        sub: dataResponse.id,
        mail: dataResponse.email,
        avatar: dataResponse.avatar,
      };
      const c_id = this._jwtService.sign(payload, {
        secret: process.env.TOKEN_SECRET,
      });
      const userSessionId = await this._sessionService.searchSessionByUser(
        dataResponse.id,
      );
      let payload_session: any;
      let sess_token: any;
      let sess_id: string;
      if (userSessionId) {
        sess_id = userSessionId;
        payload_session = {
          sub: sess_id,
        };
      } else {
        sess_id = await this._sessionService.CreateSession(dataResponse.id);
        payload_session = {
          sub: sess_id,
        };
      }

      sess_token = this._jwtService.sign(payload_session, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: process.env.REFRESH_DURATION,
      });

      await this._sessionService.UpdateSession(sess_id, sess_token);

      response = {
        message: 'The user was signed up successfuly!',
        data: { c_id, sess_id: sess_token },
        statusCode: HttpStatus.OK,
      };
    } else {
      response = { statusCode, message };
    }
    return response;
  }

  async verifyCode(email: string, code: string) {
    return await this._mfaService.verifyCode(email, code);
  }
}
