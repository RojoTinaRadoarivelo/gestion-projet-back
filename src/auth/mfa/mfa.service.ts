import { Injectable } from '@nestjs/common';

@Injectable()
export class MfaService {
  private verificationCodes = new Map<
    string,
    { code: string; expiresAt: Date }
  >();
  constructor() {}

  getVerificationCodes(email: string = 'rojotina.radoarivelo@gmail.com'): {
    email: string;
    validation: { code: string; expiresAt: Date };
  } {
    const emails = this.verificationCodes.keys();
    let foundEmail: string = '';
    let foundCodes: any = null;
    let resultCode: any = null;

    for (const emailItem of emails) {
      if (emailItem == email) {
        foundEmail = emailItem;
        foundCodes = this.verificationCodes.get(emailItem);
        break;
      }
    }

    if (foundEmail) {
      resultCode = {
        email: foundEmail,
        codes: foundCodes,
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
    const code = Math.floor(1000000 + Math.random() * 9000000).toString();
    this.VerificationCodes = {
      email,
      validation: {
        code,
        expiresAt,
      },
    };
  }
}
