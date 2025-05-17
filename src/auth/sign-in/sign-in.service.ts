import { HttpStatus, Injectable } from '@nestjs/common';
import { FindUsersService } from 'src/user-management/find-users/find-users.service';
import { SignInDto } from '../interfaces/dtos/sign-in.dto';
import { Users } from 'src/user-management/users.entity';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { AuthUserPresenter } from '../interfaces/presenters/auth-user.presenter';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { SignedUserDto } from '../interfaces/dtos/signed-user.dto';

@Injectable()
export class SignInService {
  constructor(
    private readonly _userService: FindUsersService,
    private readonly _jwtService: JwtService,
    private readonly _sessionService: SessionsService,
  ) {}

  async SignIn(
    data: SignInDto,
  ): Promise<reponsesDTO<{ c_id: any; sess_id: any }>> {
    let response: reponsesDTO<{ c_id: any; sess_id: any }>;
    const searchUser: reponsesDTO<Users> = await this._userService.findOneBy(
      {
        email: data.email,
        password: data.password,
      },
      true,
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
        message: 'The user was signed in successfuly!',
        data: { c_id, sess_id: sess_token },
        statusCode: HttpStatus.OK,
      };
    } else {
      response = { statusCode, message };
    }
    return response;
  }

  async refresh(
    token: string,
  ): Promise<reponsesDTO<{ c_id: any; sess_id: any }>> {
    let response: reponsesDTO<{ c_id: any; sess_id: any }>;
    const decoded = this._jwtService.decode(token);

    const userSessionId = await this._sessionService.searchSessionById(
      decoded.sub,
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
      response = { statusCode: 500, message: 'The user is not found' };
      return response;
    }

    sess_token = this._jwtService.sign(payload_session, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: process.env.REFRESH_DURATION,
    });

    const updated = await this._sessionService.UpdateDetailedSession(
      sess_id,
      sess_token,
    );

    const searchUser: reponsesDTO<Users> = await this._userService.findOne(
      updated.user.id,
      true,
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

      response = {
        message: 'The token was refresh successfuly!',
        data: { c_id, sess_id: sess_token },
        statusCode: HttpStatus.OK,
      };
    } else {
      response = { statusCode, message };
    }
    return response;
  }

  async SearchUserByEmail(email: string): Promise<reponsesDTO<SignedUserDto>> {
    let response: reponsesDTO<SignedUserDto>;
    const searchUser: reponsesDTO<Users> = await this._userService.findOneBy({
      email,
    });
    const statusCode = searchUser.statusCode;
    const message = searchUser.message;

    if (searchUser.data) {
      let userPresenter: AuthUserPresenter = new AuthUserPresenter();
      const dataResponse = userPresenter.present(searchUser.data);
      response = {
        message: 'The user was found!',
        data: dataResponse,
        statusCode: HttpStatus.OK,
      };
    } else {
      response = { statusCode, message };
    }
    return response;
  }
}
