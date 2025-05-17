import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ErrorMessages } from 'src/core/utils/interfaces/error-messages';

export class CreateUserDto {
  @IsNotEmpty({ message: ErrorMessages.REQUIRED, groups: ['create'] })
  @IsString({ message: ErrorMessages.INVALID_TYPE })
  @IsEmail(
    { allow_display_name: true },
    { message: ErrorMessages.INVALID_EMAIL },
  )
  email: string;
  @IsNotEmpty({ message: ErrorMessages.REQUIRED, groups: ['create'] })
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
  @IsOptional()
  @IsString({ message: ErrorMessages.INVALID_TYPE })
  userName?: string;
  @IsOptional()
  @IsString({ message: ErrorMessages.INVALID_TYPE })
  avatar?: string;
}
