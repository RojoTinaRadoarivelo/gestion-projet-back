import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { ErrorMessages } from 'src/core/utils/interfaces/error-messages';

export class SignUpDto {
  @IsNotEmpty({ message: ErrorMessages.REQUIRED })
  @IsString({ message: ErrorMessages.INVALID_TYPE })
  @IsEmail(
    { allow_display_name: true },
    { message: ErrorMessages.INVALID_TYPE },
  )
  email: string;
  @IsNotEmpty({ message: ErrorMessages.REQUIRED })
  @IsStrongPassword(
    {
      minLength: 10,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: ErrorMessages.NOT_STRONG_PWD },
  )
  @IsString({ message: ErrorMessages.INVALID_TYPE })
  password: string;
}
