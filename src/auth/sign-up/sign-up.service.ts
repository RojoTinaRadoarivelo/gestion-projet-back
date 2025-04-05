import { HttpStatus, Injectable } from '@nestjs/common';
import { MfaService } from '../mfa/mfa.service';
import { SMTPUtil } from 'src/core/utils/smtp.util';
import { SignUpDto } from '../interfaces/dtos/sign-up.dto';
import { CreateUserService } from 'src/user-management/create-user/create-user.service';
import { JwtService } from '@nestjs/jwt';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { AuthUserPresenter } from '../interfaces/presenters/auth-user.presenter';
import { SessionsService } from '../sessions/sessions.service';
import { Users } from 'src/user-management/users.entity';

@Injectable()
export class SignUpService {
  private transporter: any;
  constructor(
    private readonly _mfaService: MfaService,
    private readonly _smtpService: SMTPUtil,
    private readonly _userService: CreateUserService,
    private readonly _jwtService: JwtService,
    private readonly _sessionService: SessionsService,
  ) {
    this.transporter = this._smtpService.CreateTransport();
  }

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
      const userSessionId = await this._sessionService.searchSession(
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
  private async SendVerificationCode(
    email: string = 'rojotina.radoarivelo@gmail.com',
  ) {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await this._mfaService.GenerateValidationCodeTo(email, expiresAt);

    const resultValidation = this._mfaService.getVerificationCodes();
    const bodyHml = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Validation Email</title>
                <style>
                    h1{
                      font-size:40px;
                      color: #FE5C18;
                    }
                    .title{
                      font-size:24px
                    } 
                    .container {
                        background-color: #E8F0FE; 
                        border: 1px solid #ccc;
                        border-radius: 8px; 
                        padding: 20px; 
                        max-width: 1000px;
                        margin: 20px auto; 
                        text-align: center; 
                    } 
                     p {
                        margin-bottom: 50px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                        <h1>Project-management</h1>
                        <div class="title">Your Project-management one-time password:</div>
                        <div class="title">${resultValidation.validation.code}</div>
                        <p>Use the six-digit code above to verify your identity. For security reasons, 
                        it will expire in 15 minutes. Never share this code with anyone. 
                        Project-management will never call you or send you a text message to request this access code.</p>

                        <p>If you did not request this access code, please reset your password</p>
                </div>
            </body>
            </html>`;
    const mailToSend = this._smtpService.CreateMail(
      email,
      'Test email',
      bodyHml,
    );
    this.transporter.sendMail(mailToSend);

    return { result: resultValidation };
  }
}
