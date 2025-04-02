import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ErrorMessages } from 'src/core/utils/interfaces/error-messages';

export class StatusUserDto {
  @IsNotEmpty()
  @IsBoolean({ message: ErrorMessages.INVALID_TYPE })
  isBlocked: boolean;
}
