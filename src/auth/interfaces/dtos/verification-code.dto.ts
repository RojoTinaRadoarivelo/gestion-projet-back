import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ErrorMessages } from 'src/core/utils/interfaces/error-messages';

export class SendVerificationCodeDto {
  @IsNotEmpty({ message: ErrorMessages.REQUIRED })
  @IsString({ message: ErrorMessages.INVALID_TYPE })
  @IsEmail(
    { allow_display_name: true },
    { message: ErrorMessages.INVALID_EMAIL },
  )
  email: string;
}

export class VerificationCodeDto {
  @IsNotEmpty({ message: ErrorMessages.REQUIRED })
  @IsString({ message: ErrorMessages.INVALID_TYPE })
  @IsEmail(
    { allow_display_name: true },
    { message: ErrorMessages.INVALID_TYPE },
  )
  email: string;
  @IsNotEmpty({ message: ErrorMessages.REQUIRED })
  @IsString({ message: ErrorMessages.INVALID_TYPE })
  @Length(8, 8)
  code: string;
}
