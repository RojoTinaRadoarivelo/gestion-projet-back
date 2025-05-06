import { HttpStatus, Injectable } from '@nestjs/common';
import { ForgotPasswordDto } from '../interfaces/dtos/forgot-pwd.dto';
import { UpdateUserService } from 'src/user-management/update-user/update-user.service';
import { AuthUserPresenter } from '../interfaces/presenters/auth-user.presenter';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Users } from 'src/user-management/users.entity';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { HashPassword } from 'src/core/utils/interfaces/pwd-encryption';
import { MfaService } from '../mfa/mfa.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly _userService: UpdateUserService,
    private readonly _jwtService: JwtService,
    private readonly _sessionService: SessionsService,
    private readonly _mfaService: MfaService,
  ) {}

  async ForgotPwd(
    data: ForgotPasswordDto,
  ): Promise<reponsesDTO<{ c_id: any; sess_id: any }>> {
    let response: reponsesDTO<{ c_id: any; sess_id: any }>;
    const hashedPassword = await HashPassword(data.password, 10);
    data.password = hashedPassword;
    const searchUser: reponsesDTO<Users> = await this._userService.UpdateOneBy(
      data,
      {
        email: data.email,
      },
    );
    const statusCode = searchUser.statusCode;
    const message = searchUser.message;

    if (searchUser.data) {
      let userPresenter: AuthUserPresenter = new AuthUserPresenter();
      const dataResponse = userPresenter.present(searchUser.data);

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
        message: 'The user password was reset successfuly!',
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
