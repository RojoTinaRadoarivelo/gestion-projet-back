import { Injectable } from '@nestjs/common';
import { MfaService } from '../mfa/mfa.service';
import { SMTPUtil } from 'src/core/utils/smtp.util';

@Injectable()
export class SignUpService {
  private transporter: any;
  constructor(
    private readonly _mfaService: MfaService,
    private readonly _smtpService: SMTPUtil,
  ) {
    this.transporter = this._smtpService.CreateTransport();
  }

  async SendVerificationCode(email: string = 'rojotina.radoarivelo@gmail.com') {
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
