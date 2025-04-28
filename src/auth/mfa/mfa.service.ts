import { HttpStatus, Injectable } from '@nestjs/common';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { SMTPUtil } from 'src/core/utils/smtp.util';

@Injectable()
export class MfaService {
  private verificationCodes = new Map<
    string,
    { code: string; expiresAt: Date }
  >();
  private transporter: any;
  constructor(private readonly _smtpService: SMTPUtil) {
    this.transporter = this._smtpService.CreateTransport();
  }

  getVerificationCodes(email: string): {
    email: string;
    validation: { code: string; expiresAt: Date };
  } {
    const emails = this.verificationCodes.keys();
    let foundEmail: string = '';
    let foundCodes: any = null;
    let resultCode: any = null;

    for (const emailItem of emails) {
      if (emailItem && emailItem == email) {
        foundEmail = emailItem;

        foundCodes = this.verificationCodes.get(emailItem);
        break;
      }
    }

    if (foundEmail && (foundEmail != null || foundEmail != undefined)) {
      resultCode = {
        email: foundEmail,
        validation: {
          code: foundCodes.code,
          expiresAt: foundCodes.expiresAt,
        },
      };
    }

    return resultCode;
  }
  set VerificationCodes(verification: {
    email: string;
    validation: { code: string; expiresAt: Date };
  }) {
    this.verificationCodes.set(verification.email, verification.validation);
  }

  async GenerateValidationCodeTo(
    email: string,
    expiresAt: Date,
  ): Promise<void> {
    const code = Math.floor(10000000 + Math.random() * 90000000).toString();
    this.VerificationCodes = {
      email,
      validation: {
        code,
        expiresAt,
      },
    };
  }

  async SendVerificationCode(email): Promise<reponsesDTO<{}>> {
    let response: reponsesDTO<{}>;
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await this.GenerateValidationCodeTo(email, expiresAt);

    const resultValidation = this.getVerificationCodes(email);

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
                        it will expire in 10 minutes. Never share this code with anyone. 
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
    try {
      this.transporter.sendMail(mailToSend);
      response = {
        statusCode: 200,
        message: 'The verification code was sent to your email',
      };
      return response;
    } catch (error) {
      response = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'There was an error while sending the verification code to your email',
      };
      return response;
    }
  }

  async verifyCode(email: string, code: string) {
    let response: reponsesDTO<{}>;

    const storedData = this.getVerificationCodes(email);

    if (storedData && storedData.validation.code == code) {
      response = {
        statusCode: 200,
        message: 'Your email account was verified',
      };
      return response;
    }
    response = {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'The verification of your email account failed',
    };
    return response;
  }
}
